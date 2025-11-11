import express from 'express';
import { connect } from '../../db/db.js';
import { Buy } from '../../models/user/buyModel.js';
import { getUserSession } from '../../sessions/userSession.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await connect();

    // const usersAuth = await getUserSession(req.body.sessionId);
    // console.log(usersAuth);
    
    // if(!usersAuth){
    //   return res.status(401).json('not authorized.');
    // }

    const buyData = {
      order_type: Number(req.body.order_type),
      user_id: req.body.user_id,
      selected_product: req.body.selected_product,
      weight_value: Number(req.body.weight_value),
      weight_unit: req.body.weight_unit,
      price_value: Number(req.body.price_value),
    };
    const newBuy = new Buy(buyData);
    const savedBuy = await newBuy.save();
    res.status(200).json(savedBuy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create buy order!' , details: err.message });
  }
});

export default router
