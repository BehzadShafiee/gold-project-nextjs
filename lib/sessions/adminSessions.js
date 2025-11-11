
import { connect } from '../db/db.js';
import crypto from 'crypto';
import { AdminSession } from '../models/admin/main-models/adminSessionModel.js';

// create new session
export const createAdminSession = async (adminId) => {
  
  await connect();
  const sessionId = crypto.randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
  
  const session = await AdminSession.create({ adminId, sessionId, expiresAt });

  return session;
};

// get session
export const getAdminSession = async (sessionId) => {
  await connect();
  const session = await AdminSession.findOne({ sessionId });
  if (!session) return null;
  if (new Date() > session.expiresAt) {
    await AdminSession.deleteOne({ _id: session._id });
    return null;
  }
  return session;
};

// destroy session
export const destroyAdminSession = async (adminId) => {
  await connect();
  await AdminSession.deleteOne({ adminId });
};
