import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, min: 5, max: 50},
    email: { type: String, required: true, max: 50, unique: true},
    nationalCode: { type: String, required: true, min: 10, max: 10, unique: true},
    mobile: { type: String, required: true, min: 11 ,max: 11, unique: true},
    province: { type: String, required: true},
    city: { type: String, required: true},
    address: {type: String},
    password: {type: String, required: true, min: 8},
    createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User' , userSchema);