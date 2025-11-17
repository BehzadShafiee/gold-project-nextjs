import mongoose from "mongoose";

const walletItemSchema = new mongoose.Schema({
    productId: {type: String , ref: 'Product' , required: true},
    productName: {type: String , required: true},
    amount: {type: String , required: true},
    unit: {type: String , required: true , default: 'gr'},
    pricePerUnit: {type: String , required: true},
    currency: {type: String , required: true},
    totalPrice: {type: String , required: true},
    addDate: {type: Date , default: Date.now()},
});

const userWalletSchema = new mongoose.Schema({
    // walletId: {type: String , required: true},
    userId: {type: String , ref: 'User' , required: true},
    createdAt: {type: Date , default: Date.now()},
    updatedAt: {type: Date , default: Date.now()},
    products: [walletItemSchema]
});

export const UserWallet = mongoose.models.UserWallet || mongoose.model('UserWallet' , userWalletSchema);