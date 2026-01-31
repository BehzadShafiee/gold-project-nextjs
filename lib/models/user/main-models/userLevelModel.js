import mongoose from "mongoose";

const userLevelSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userLevelRate: {type: Number, required: true},
    userLevelName: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserLevel = mongoose.models.UserLevel || mongoose.model('UserLevel' , userLevelSchema);