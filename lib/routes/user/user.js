import express from 'express';
import bcrypt from 'bcrypt';
import { connect } from '../../db/db.js';
import { User } from '../../models/user/main-models/userModel.js';
import { Sell } from '../../models/user/sellModel.js';
import { Buy } from '../../models/user/buyModel.js';
import { OrderRegister } from '../../models/admin/order-models/orderRegisterModel.js';
import { Product } from '../../models/admin/product-models/productModel.js';
import { UserWallet } from '../../models/user/main-models/userWalletModel.js';
import { UserRegister } from '../../models/user/main-models/userRegisterModel.js';
import { UserLevel } from '../../models/user/main-models/userLevelModel.js';
import { createUserSession , getUserSession , destroyUserSession } from '../../sessions/userSession.js';

const router = express.Router();

// check user authorization (session and log-in)
router.get("/check-auth/:sessionId/:userId", async (req, res) => {
    try {
        await connect();
        const userRegister = await UserRegister.findOne({userId : req.params.userId});        
        if(!userRegister || userRegister.isRegister == 1){
            res.status(401).json({
                status: 401,
                isAuthorized: 'not-registered'
            });
        }
        const usersAuth = await getUserSession(req.params.sessionId);
        if(!usersAuth){
            res.status(401).json({
                status: 401,
                isAuthorized: 'not-authorized'
            });
        }
        res.status(200).json(usersAuth);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create new user (sign-in)
router.post("/sign-in", async (req, res) => {
    try {
        
        await connect();

        // generate new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            nationalCode: req.body.nationalCode,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
            province: req.body.province,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // create new wallet on user sign-in
        const newUserWallet = new UserWallet({
            userId: user._id,
            products: []
        });

        const newWallet = await newUserWallet.save();

        // Create a session
        const session = await createUserSession(user._id);
        res.cookie('userSessionId', session.sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.cookie('userId', session.userId.toString(), {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.status(200).json({
            status: 200,
            message: 'ثبت نام با موفقیت انجام شد',
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'خطا در انجام عملیات',
            err
        });
    }
});

// user login
router.post("/log-in", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(404).json({
                status: 404,
                message: 'ایمیل وارد شده معتبر نیست'
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(404).json({
                status: 404,
                message: 'رمز وارد شده اشتباه است'
            });
        }

        // Create session
        const session = await createUserSession(user._id);
        res.cookie('userSessionId', session.sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.cookie('userId', session.userId.toString(), {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.status(200).json({
            status: 200,
            message: 'ورود با موفقیت انجام شد',
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'خطا در انجام عملیات',
            err
        });
    }
});

// user log-out
router.put("/log-out", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if(!user) return res.status(404).json("user not found!");

        // delete session
        await destroyUserSession(user._id);

        res.status(200).json('logged out successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get all users
router.get("/users-list", async (req, res) => {
  try {
    await connect();

    const users = await User.find().lean();
    const userRegisters = await UserRegister.find().lean();

    const usersList = users.map(user => {
      const userRegister = userRegisters.find(
        u => String(u.userId) === String(user._id)
      );
      return {
        ...user,
        userRegister: userRegister ? userRegister.isRegister : 0,
        userLevel: userRegister ? userRegister.userLevelRate : 0,
      };
    });

    res.status(200).json(usersList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users list", error: err });
  }
});

// get user
router.get("/:id", async (req, res) => {
  try {
    await connect();

    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRegister = await UserRegister.findOne({ userId: req.params.id }).lean();

    res.status(200).json({
      ...user,
      userRegister: userRegister ? userRegister.isRegister : 0,
      userLevel: userRegister ? userRegister.userLevelRate : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// register new user
router.post("/register/:id", async (req, res) => {
    try {
        await connect();
        const register = new UserRegister({
            userId: req.body.userId,
            email: req.body.email,
            isRegister: req.body.userRegister,
            userLevelRate : req.body.userLevel,
        });
        const registerUser = await register.save();

        res.status(200).json({
            status: 200,
            message: 'ویرایش کاربر با موفقیت انجام شد',
            registerUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'خطا در انجام عملیات',
            err
        });
    }
});

// update user register
router.put("/register/:id", async (req, res) => {
    try {
        await connect();
        const updateRegister = await UserRegister.findOneAndUpdate({email: req.body.email} , {isRegister: req.body.userRegister , userLevelRate: req.body.userLevel});
        res.status(200).json({
            status: 200,
            message: 'ویرایش کاربر با موفقیت انجام شد',
            updateRegister,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'خطا در انجام عملیات',
            err
        });
    }
});

// get user's all orders list
router.get("/orders-list/:id", async (req, res) => {
  try {
    await connect();

    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [sells, buys] = await Promise.all([
      Sell.find({user_id : req.params.id}).sort({ createdAt: -1 }).lean(),
      Buy.find({user_id : req.params.id}).sort({ createdAt: -1 }).lean(),
    ]);

    const allOrders = [...sells, ...buys].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const allRegisters = await OrderRegister.find();

    const ordersWithRegister = await Promise.all(
      allOrders.map(async (order) => {
        const registration = allRegisters.find(
          (reg) => reg.orderId?.toString() === order._id.toString()
        );

        let orderProduct = '';

        if (order.order_type === 1) { // 1 is buy
          const product = await Product.findById(order.selected_product).lean();
          orderProduct = product ? product.name : '';
        } else if (order.order_type === 0) { // 0 is sell
          orderProduct = order?.product_name || '';
        }

        return {
          ...order,
          isRegister: registration ? registration.isRegister : 0,
          orderProduct,
        };
      })
    );

    res.status(200).json({ordersWithRegister , user});
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch orders',
      details: err.message,
    });
  }
});

export default router;
