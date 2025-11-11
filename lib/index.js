import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './db/db.js';
import { port } from './config.js';

import userRouter from './routes/user/user.js';
import walletRouter from './routes/user/wallet.js';
import sellRouter from './routes/user/sell.js';
import buyRouter from './routes/user/buy.js';

import adminRouter from './routes/admin/admin.js';
import ordersRouter from './routes/admin/orders.js';
import productRouter from './routes/admin/product.js';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // or frontend URL
  credentials: true, // allow sending cookies
}));

// Protected routes
/**
 * all user apis declare and use here
 */
app.use('/user/api/user', userRouter);
app.use('/user/api/wallet', walletRouter);
app.use('/user/api/sell', sellRouter);
app.use('/user/api/buy', buyRouter);

/**
 * all admin apis declare and use here
 */
app.use('/admin/api/admin', adminRouter);
app.use('/admin/api/orders', ordersRouter);
app.use('/admin/api/products', productRouter);

// Start server
app.listen(port, async () => {
  await connect();
  console.log(`Backend is running on port ${port} ...`);
});
