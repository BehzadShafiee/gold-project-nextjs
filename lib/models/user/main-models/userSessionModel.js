
import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  sessionId: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

export const UserSession = mongoose.models.UserSession || mongoose.model('userSession', userSessionSchema);
