import express from 'express';
import { connect } from '../../db/db.js';
import { UserWallet } from '../../models/user/main-models/userWalletModel.js';

const router = express.Router();

router.get('/:id' , async (req , res) => {
    try {
        await connect();

        const wallet = await UserWallet.findOne({ userId : req.params.id });

        res.status(200).json(wallet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Unsuccessful to get wallet!' , details: err.message });
    }
});

export default router;