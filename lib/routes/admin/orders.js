import express from 'express';
import { connect } from '../../db/db.js';
import { Sell } from '../../models/user/sellModel.js';
import { Buy } from '../../models/user/buyModel.js';
import { OrderRegister } from '../../models/admin/order-models/orderRegisterModel.js';
import { User } from '../../models/user/main-models/userModel.js';
import { Product } from '../../models/admin/product-models/productModel.js';
import { UserWallet } from '../../models/user/main-models/userWalletModel.js';

const router = express.Router();

// get all orders
router.get('/', async (req, res) => {
  try {
    await connect();

    const [sells, buys] = await Promise.all([
      Sell.find().sort({ createdAt: -1 }).lean(),
      Buy.find().sort({ createdAt: -1 }).lean(),
    ]);

    const allOrders = [...sells, ...buys].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const allRegisters = await OrderRegister.find();

    const ordersWithRegister = await Promise.all(
      allOrders.map(async (order) => {
        const registration = allRegisters.find(
          (reg) => reg.orderId?.toString() === order._id.toString()
        );

        let orderProduct = '';

        if (order.order_type === 1) { // 1 is buy
          const product = await Product.findById(order.selected_product).lean();
          orderProduct = product ? product.name : '';
        } else if (order.order_type === 0) { // 0 is sell
          orderProduct = order?.product_name || '';
        }

        return {
          ...order,
          isRegister: registration ? registration.isRegister : 0,
          orderProduct,
        };
      })
    );

    res.status(200).json(ordersWithRegister);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch orders',
      details: err.message,
    });
  }
});

// get limited last unregistered orders
router.get('/new-orders-list/:limit', async (req, res) => {
  try {
    await connect();

    const [sells, buys] = await Promise.all([
      Sell.find().sort({ createdAt: -1 }).limit(req.params.limit).lean(),
      Buy.find().sort({ createdAt: -1 }).limit(req.params.limit).lean(),
    ]);

    const allOrders = [...sells, ...buys].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const allRegisters = await OrderRegister.find();

    const ordersWithRegister = await Promise.all(
      allOrders.map(async (order) => {
        const registration = allRegisters.find(
          (reg) => reg.orderId?.toString() == order._id.toString()
        );

        let orderProduct = '';

        if (order.order_type === 1) { // 1 is buy
          const product = await Product.findById(order.selected_product).lean();
          orderProduct = product ? product.name : '';
        } else if (order.order_type === 0) { // 0 is sell
          orderProduct = order?.product_name || '';
        }

        return {
          ...order,
          isRegister: registration ? registration.isRegister : 0,
          orderProduct,
        };
      })
    );

    const unregisteredOrders = ordersWithRegister.filter( o => o.isRegister == 0);

    res.status(200).json(unregisteredOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch orders',
      details: err.message,
    });
  }
});

// get an order
router.get('/:id', async (req, res) => {
  try {
    await connect();

    let user = null;
    let orderProduct = '';

    const sellOrder = await Sell.findById(req.params.id).lean();
    if (sellOrder) {
      const orderRegister = await OrderRegister.findOne({ orderId: req.params.id }).lean();

      if (sellOrder.user_id) {
        user = await User.findById(sellOrder.user_id).select('username mobile').lean();
      }

      orderProduct = sellOrder?.product_name || '';
      
      res.status(200).json({
        ...sellOrder,
        user: user,
        isRegister: orderRegister ? orderRegister.isRegister : 0,
        orderProduct
      });
    }

    const buyOrder = await Buy.findById(req.params.id).lean();
    if (buyOrder) {
      const orderRegister = await OrderRegister.findOne({ orderId: req.params.id }).lean();

      if (buyOrder.user_id) {
        user = await User.findById(buyOrder.user_id).select('username mobile').lean();
      }

      const product = await Product.findById(buyOrder.selected_product).lean();
      orderProduct = product ? product.name : '';
      
      res.status(200).json({
        ...buyOrder,
        user: user,
        isRegister: orderRegister ? orderRegister.isRegister : 0,
        orderProduct
      });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'خطا در دریافت اطلاعات',
      err
    });
  }
});

// register new order
router.post("/register/:id", async (req, res) => {
    try {
      await connect();
      const register = new OrderRegister({
        orderId: req.body.orderId,
        order_type: req.body.order_type,
        isRegister: req.body.orderRegister
      });
      const registerOrder = await register.save();

      // submit order product to products DB (after admin confirmed)
      if(req.body.order_type == 0 ){

        const sellOrder = await Sell.findById(req.body.orderId).lean();

        // remove order product from user's wallet (after admin confirmed)
        if(registerOrder.isRegister == 2){
          const wallet = await UserWallet.findOne({userId : sellOrder.user_id});
  
          if(wallet && wallet.products.length){
            wallet.products = wallet.products.filter( p => p.productId != sellOrder.product_id); 
            wallet.updatedAt = Date.now();
            await wallet.save();
          }
        }

        if(req.body.submit_product == 1){

          await Sell.findOneAndUpdate({_id : req.body.orderId} , {submit_product : req.body.submit_product});

          const p = new Product({ 
            name : sellOrder.product_name,
            code:'',
            category:'',
            standard:'18',
            weightOrNumber: sellOrder.weight_value,
            unit: sellOrder.weight_unit,
            related_order: req.body.orderId,
            from_customer: 1
          });
          
          const newProduct = await p.save();

          res.status(200).json({
            status: 200,
            message: 'ویرایش فاکتور با موفقیت انجام شد',
            registerOrder,
            newProduct
          });

        }
      } else {

        const buyOrder = await Buy.findById(req.body.orderId).lean();

        // add bought product to user's wallet (after admin confirmed)
        if(registerOrder.isRegister == 2){
          const wallet = await UserWallet.findOne({userId: buyOrder.user_id});

          const product = await Product.findById(buyOrder.selected_product).lean();
          const productName = product ? product.name : 'aaa';

          // Array.isArray(wallet.products) ?
          //   wallet.products.map(p => ({}))
          // : 
          
          wallet.products.push({
            productId: buyOrder.selected_product,
            productName: productName,
            amount: buyOrder.weight_value,
            unit: buyOrder.weight_unit,
            pricePerUnit: buyOrder.weight_unit,
            currency: buyOrder.currency || 'IRR',
            totalPrice: buyOrder.price_value,
            addDate: Date.now(),
          });

          await wallet.save();
        }

      }

      res.status(200).json({
        status: 200,
        message: 'ویرایش فاکتور با موفقیت انجام شد',
        registerOrder
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: 'خطا در انجام عملیات',
        err
      });
    }
});

// update order register
router.put("/register/:id", async (req, res) => {
    try {
      await connect();
      const updateRegister = await OrderRegister.findOneAndUpdate({orderId: req.body.orderId} , {isRegister: req.body.orderRegister});

      // submit order product to products DB (if admin accepted)
      if(req.body.order_type == 0 ){
        if(req.body.submit_product == 1){

          const isSubmitedBefore = await Product.findOne({related_order: req.body.orderId}).lean();

          if(!isSubmitedBefore){
            const sellOrder = await Sell.findById(req.body.orderId).lean();

            await Sell.findOneAndUpdate({_id : req.body.orderId} , {submit_product : req.body.submit_product});
  
            const p = new Product({
              name : sellOrder.product_name,
              code:'',
              category:'',
              standard:'18',
              weightOrNumber: sellOrder.weight_value,
              unit: sellOrder.weight_unit,
              related_order: req.body.orderId,
              from_customer: 1
            });
            
            const newProduct = await p.save();
  
            res.status(200).json({
              status: 200,
              message: 'ویرایش فاکتور با موفقیت انجام شد',
              registerOrder,
              newProduct
            });

          }

        }
      }

      res.status(200).json({
        status: 200,
        message: 'ویرایش فاکتور با موفقیت انجام شد',
        updateRegister
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: 'خطا در انجام عملیات',
        err
      });
    }
});

export default router;
