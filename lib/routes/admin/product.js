
import express from 'express';
import { connect } from '../../db/db.js';
import { Product } from '../../models/admin/product-models/productModel.js';
import { ProductDetail } from '../../models/admin/product-models/productDetailModel.js';
import { ProductPrice } from '../../models/admin/product-models/productPriceModel.js';
import { calculateProductPriceByAttributes } from '../../common.js';

const router = express.Router();

// create a new product with details & price
router.post('/new-product', async (req, res) => {
  try {
    await connect();
    const { product: productPayload, attributes = [], price: pricePayload } = req.body;

    if (!productPayload || !productPayload.name) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    if (!pricePayload || typeof pricePayload.basePrice === 'undefined') {
      return res.status(400).json({ error: 'basePrice is required in price' });
    }

    const product = new Product({
      name: productPayload.name,
      code: productPayload.code || undefined,
      category: productPayload.category || undefined,
      standard: productPayload.standard || undefined,
      weightOrNumber: productPayload.weightOrNumber,
      unit: productPayload.unit || 'gr',
    });

    const savedProduct = await product.save();

    let calculated = pricePayload.basePrice;

    if(Array.isArray(attributes) && attributes.length > 0){
      const detailDoc = new ProductDetail({
        product: savedProduct._id,
        attributes: attributes.map(a => ({
          key: a.key,
          value: a.value,
          unit: a.unit || '',
          calculateOnPrice: Boolean(a.calculateOnPrice),
          operator: a.operator || 'none'
        }))
      });

      await detailDoc.save();

      calculated = calculateProductPriceByAttributes(pricePayload.basePrice, detailDoc.attributes);
    }

    if(pricePayload.calculateTax){
      calculated *= 1.1;
    }

    const priceDoc = new ProductPrice({
      product: savedProduct._id,
      basePrice: pricePayload.basePrice,
      priceUnit: pricePayload.priceUnit || 'perGram',
      currency: pricePayload.currency || 'IRR',
      calculateTax: pricePayload.calculateTax || false,
      calculatedPrice: calculated,
      createdAt: Date.now()
    });
    
    await priceDoc.save();

    const productWithAll = await Product.findById(savedProduct._id)
      .lean()
      .populate({ path: 'details', model: 'ProductDetail' })
      .populate({ path: 'prices', model: 'ProductPrice' });

    const details = await ProductDetail.findOne({ product: savedProduct._id });
    const prices = await ProductPrice.find({ product: savedProduct._id }).sort({ createdAt: -1 });

    return res.status(201).json({
      product: productWithAll || savedProduct,
      details,
      prices
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create full product', details: err.message });
  }
});

// create product only
router.post('/product', async (req, res) => {
  try {
    await connect();
    const { name, code, category, standard, weightOrNumber, unit } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const p = new Product({ name, code, category, standard, weightOrNumber, unit });
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// create details only
router.post('/product-details', async (req, res) => {
  try {
    await connect();
    const { productId, attributes } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    const d = new ProductDetail({
      product: productId,
      attributes: Array.isArray(attributes) ? attributes : []
    });
    const saved = await d.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product details', details: err.message });
  }
});

// create price only (and compute calculatedPrice using current details for that product)
router.post('/product-price/:id', async (req, res) => {
  try {
    await connect();
    const productId = req.params.id;
    const { basePrice, changeType, changeValue, calculateTax, priceUnit, currency } = req.body;

    if (!productId) return res.status(400).json({ error: 'productId required' });
    if (typeof basePrice == 'undefined' || basePrice == 0){
      return res.status(400).json({
        status: 400,
        message: 'قیمت پایه را وارد کنید'
      });
    };

    const { attributes = [] } = await ProductDetail.findOne({ product: productId }) || {};
    let calculated = calculateProductPriceByAttributes(basePrice, attributes);

    if (changeType == 'plus') calculated += Number(changeValue);
    else if (changeType == 'minus') calculated -= Number(changeValue);

    if (calculateTax) calculated *= 1.1;

    const priceDoc = new ProductPrice({
      product: productId,
      basePrice,
      priceUnit: priceUnit || 'perGram',
      currency: currency || 'IRR',
      calculatedPrice: calculated,
      calculateTax: calculateTax || false,
      createdAt: Date.now()
    });

    await priceDoc.save();
    res.status(200).json({
      status: 200,
      message: 'قیمت با موفقیت ثبت شد',
      price: calculated,
      id: productId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'خطا در ثبت قیمت',
      details: err.message
    });
  }
});

// create price only for a list of products (and compute calculatedPrice using current details for that product)
router.post('/products-prices-list', async (req, res) => {
  try {
    await connect();

    const items = req.body;

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({
        status: 400,
        message: 'لیست قیمت ها ارسال نشده است'
      });
    }

    const productIds = items.map(i => i.productId);

    const productDetails = await ProductDetail.find({
      product: { $in: productIds }
    }).lean();

    const detailMap = {};
    productDetails.forEach(d => {
      detailMap[d.product.toString()] = d;
    });

    const docsToInsert = [];
    const responseResults = [];

    for (const item of items) {

      const {
        productId,
        basePrice,
        changeType,
        changeValue,
        calculateTax,
        priceUnit,
        currency
      } = item;

      if (!productId) {
        return res.status(400).json({
          status: 400,
          message: 'اطلاعات ناقص (آیدی محصول)'
        });
      }

      if (typeof basePrice == 'undefined' || basePrice == 0){
        const productName = await Product.findById(productId).select("name").lean();
        return res.status(400).json({
          status: 400,
          message: `قیمت پایه ${productName.name} را وارد کنید`
        });
      };

      const attributes = detailMap[productId]?.attributes || [];

      let calculated = calculateProductPriceByAttributes(
        Number(basePrice),
        attributes
      );

      if (changeType == 'plus')
        calculated += Number(changeValue || 0);

      else if (changeType == 'minus')
        calculated -= Number(changeValue || 0);

      if (calculateTax)
        calculated *= 1.1;

      docsToInsert.push({
        product: productId,
        basePrice: Number(basePrice),
        priceUnit: priceUnit || 'perGram',
        currency: currency || 'IRR',
        calculatedPrice: calculated,
        calculateTax: calculateTax,
        createdAt: Date.now()
      });

      responseResults.push({
        id: productId,
        status: 200,
        price: calculated
      });
    }

    if (docsToInsert.length) {
      await ProductPrice.insertMany(docsToInsert);
    }

    return res.status(200).json({
      status: 200,
      message: 'تمامی قیمت‌ها با موفقیت ثبت شد',
      results: responseResults
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: 'خطا در ثبت قیمت‌ها',
      details: err.message
    });
  }
});

// get all products with details & prices
router.get('/', async (req, res) => {
  try {
    await connect();

    const products = await Product.find().lean();

    const result = await Promise.all(products.map(async (p) => {
      const details = await ProductDetail.findOne({ product: p._id }).lean();
      const prices = await ProductPrice.find({ product: p._id }).sort({ createdAt: -1 }).lean();
      const priceTolerance = prices.length > 1 ? Math.round(prices[0].calculatedPrice - prices[1].calculatedPrice) : '';
      return { ...p, details, prices, priceTolerance };
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// get all products with details & only one last price
router.get('/products-last-price', async (req, res) => {
  try {
    await connect();

    const products = await Product.find().lean();

    const result = await Promise.all(products.map(async (p) => {
      const details = await ProductDetail.findOne({ product: p._id }).lean();
      const prices = await ProductPrice.find({ product: p._id }).sort({ createdAt: -1 }).limit(1).lean();
      return { ...p, details, prices };
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// get one product with details & prices
router.get('/:id', async (req, res) => {
  try {
    await connect()
    const product = await Product.findById(req.params.id)
      .populate('details')
      .populate({
        path: 'prices',
        options: { sort: {createdAt: -1} , limit: 1 }
      });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch product', details: err.message })
  }
});

// get one product price changes
router.get('/price-changes/:pId' , async(req , res) => {
  try {
    await connect();

    const product = await Product.findById(req.params.pId).lean().populate({
      path: 'prices',
      options: { sort: {createdAt: -1} }
    }).lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json({
      status: 200,
      product: product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update one product with details & prices
router.put('/:id', async (req, res) => {
  try {
    await connect();

    const { product: productData, attributes = [], prices = [] } = req.body;
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    existingProduct.name = productData.name ?? existingProduct.name;
    existingProduct.code = productData.code ?? existingProduct.code;
    existingProduct.category = productData.category ?? existingProduct.category;
    existingProduct.standard = productData.standard ?? existingProduct.standard;
    existingProduct.weightOrNumber = productData.weightOrNumber ?? existingProduct.weightOrNumber;
    existingProduct.unit = productData.unit ?? existingProduct.unit;

    await existingProduct.save();

    let detail = await ProductDetail.findOne({ product: productId });
    if (!detail && attributes.length > 0) {
      detail = new ProductDetail({ product: productId, attributes });
    } else {
      // Only replace if attributes were actually sent
      if (attributes && attributes.length > 0) {
        detail.attributes = attributes;
      } else {
        await ProductDetail.findOneAndDelete({ product: productId });
      }
    }
    await detail.save();

    if (prices && prices.length > 0) {
      await ProductPrice.insertMany(
        prices.map((p) => ({
          product: productId,
          basePrice: p.basePrice,
          priceUnit: p.priceUnit || 'perGram',
          currency: p.currency,
          calculatedPrice: calculateProductPriceByAttributes(p.basePrice, attributes),
          createdAt: Date.now()
        }))
      );
    }

    const fullProduct = await Product.findById(productId)
      .populate({
        path: 'details',
        populate: { path: 'attributes' },
      })
      .populate('prices');

    res.status(200).json({
      message: 'Product updated successfully',
      product: fullProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

export default router;
