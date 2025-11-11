
import mongoose from 'mongoose';

const adminSessionSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
  sessionId: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

export const AdminSession = mongoose.models.AdminSession || mongoose.model('adminSession', adminSessionSchema);
