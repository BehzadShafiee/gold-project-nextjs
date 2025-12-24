import express from 'express';
import bcrypt from 'bcrypt';
import { connect } from '../../db/db.js';
import { Admin } from "../../models/admin/main-models/adminModel.js";
import { createAdminSession , getAdminSession , destroyAdminSession } from '../../sessions/adminSessions.js';

const router = express.Router();

// check admin authorization (session and log-in)
router.get("/check-auth/:sessionId", async (req, res) => {
    try {
        await connect();
        const adminAuth = await getAdminSession(req.params.sessionId);
        if(!adminAuth){
            res.status(401).json('not-authorized');
        }
        res.status(200).json(adminAuth);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create new admin (sign-in)
router.post("/sign-in", async (req, res) => {
    try {
        
        await connect();

        // generate new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
            adminName: req.body.adminName,
            nationalCode: req.body.nationalCode,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
            province: req.body.province,
            password: hashedPassword,
        });

        const admin = await newAdmin.save();

        // Create a session
        const session = await createAdminSession(admin._id);
        res.cookie('adminSessionId', session.sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.cookie('adminId', session.adminId.toString(), {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.status(200).json({
            status: 200,
            message: 'ثبت نام با موفقیت انجام شد',
            admin
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

// admin login
router.post("/log-in", async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if(!admin) {
            return res.status(404).json({
                status: 404,
                message: 'ایمیل وارد شده معتبر نیست!'
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if(!validPassword) {
            return res.status(404).json({
                status: 404,
                message: 'رمز وارد شده اشتباه است!'
            });
        }

        // Create session
        const session = await createAdminSession(admin._id);
        res.cookie('adminSessionId', session.sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        res.cookie('adminId', session.adminId.toString(), {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return res.status(200).json({
            status: 200,
            message: 'ورود با موفقیت انجام شد'
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

// admin log-out
router.put("/log-out", async (req, res) => {
    try {
        const admin = await Admin.findOne({ _id: req.body.adminId });
        if(!admin) return res.status(404).json("admin not found!");

        // delete session
        await destroyAdminSession(admin._id);

        res.status(200).json('logged out successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;
