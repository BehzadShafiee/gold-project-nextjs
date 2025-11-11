import mongoose from "mongoose";

const walletItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId , ref: 'Product' , required: true},
    amount: {type: String , required: true},
    unit: {type: String , required: true},
    pricePerUnit: {type: String , required: true},
    currency: {type: String , required: true},
    totalPrice: {type: String , required: true},
    addDate: {type: Date , default: Date.now()},
});

const userWalletSchema = new mongoose.Schema({
    walletId: {type: String , required: true},
    userId: {type: mongoose.Schema.Types.ObjectId , ref: 'User' , required: true},
    updatedAt: {type: Date , default: Date.now()},
    products: [walletItemSchema]
});

export const UserWallet = mongoose.models.UserWallet || mongoose.model('UserWallet' , userWalletSchema);