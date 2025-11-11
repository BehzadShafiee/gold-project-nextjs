import mongoose from "mongoose";

const orderRegisterSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    order_type: { type: Number, required: true},
    isRegister: { type: Number, required: true, default: 0}
});

export const OrderRegister = mongoose.models.OrderRegister || mongoose.model('OrderRegister' , orderRegisterSchema);