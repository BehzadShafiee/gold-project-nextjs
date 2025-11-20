
import crypto from 'crypto';
import { UserSession } from '../models/user/main-models/userSessionModel.js';
import { connect } from '../db/db.js';

// create new session
export const createUserSession = async (userId) => {
  
  await connect();
  const sessionId = crypto.randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
  
  const session = await UserSession.create({ userId, sessionId, expiresAt });

  return session;
};

// get session
export const getUserSession = async (sessionId) => {
  await connect();
  const session = await UserSession.findOne({ sessionId });
  if (!session) return null;
  if (new Date() > session.expiresAt) {
    await UserSession.deleteOne({ _id: session._id });
    return null;
  }
  return session;
};

// destroy session
export const destroyUserSession = async (userId) => {
  await connect();
  await UserSession.deleteMany({ userId });
};
