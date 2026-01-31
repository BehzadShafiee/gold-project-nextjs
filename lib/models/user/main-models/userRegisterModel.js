import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, max: 50},
    isRegister: { type: Number, required: true, default: 0},
    userLevelRate: {type: Number, required: true},
});

export const UserRegister = mongoose.models.UserRegister || mongoose.model('UserRegister' , userRegisterSchema);