import express from 'express';
import { connect } from '../../db/db.js';
import { Sell } from '../../models/user/sellModel.js';
import { getUserSession } from '../../sessions/userSession.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await connect();

    // const usersAuth = await getUserSession(req.body.sessionId);
    
    // if(!usersAuth){
    //   return res.status(401).json('not authorized.');
    // }

    const sellData = {
      order_type: Number(req.body.order_type),
      user_id: req.body.user_id,
      product_id: req.body.product_name,
      product_name: req.body.product_name,
      submit_product: 0,
      weight_value: Number(req.body.weight_value),
      weight_unit: req.body.weight_unit,
      price_value: Number(req.body.price_value),
    };
    const newSell = new Sell(sellData);
    const savedSell = await newSell.save();
    res.status(200).json({
      status: 200,
      message: 'سفارش فروش با موفقیت ثبت شد',
      savedSell
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'خطا در انجام عملیات',
      err
    });
  }
});

export default router;
