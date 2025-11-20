import express from 'express';
import bcrypt from 'bcrypt';
import { connect } from '../../db/db.js';
import { User } from '../../models/user/main-models/userModel.js';
import { UserWallet } from '../../models/user/main-models/userWalletModel.js';
import { UserRegister } from '../../models/user/main-models/userRegisterModel.js';
import { createUserSession , getUserSession , destroyUserSession } from '../../sessions/userSession.js';

const router = express.Router();

// check user authorization (session and log-in)
router.get("/check-auth/:sessionId", async (req, res) => {
    try {
        await connect();
        const usersAuth = await getUserSession(req.params.sessionId);
        if(!usersAuth){
            res.status(401).json('not-authorized');
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

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user login
router.post("/log-in", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(404).json("user not found!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json("password is wrong!");

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

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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
            isRegister: req.body.userRegister
        });
        const registerUser = await register.save();
        res.status(200).json(registerUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update user register
router.put("/register/:id", async (req, res) => {
    try {
        await connect();
        const updateRegister = await UserRegister.findOneAndUpdate({email: req.body.email} , {isRegister: req.body.userRegister});
        res.status(200).json(updateRegister);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;
