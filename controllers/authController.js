const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateTokens = require("../utils/generateTokens");

// --- HELPER: Dynamic Cookie Options ---
const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        path: '/',
        secure: isProduction, 
        sameSite: isProduction ? 'none' : 'lax',
    };
};

const sendTokenResponse = (user, statusCode, res) => {
    const { accessToken, refreshToken } = generateTokens(user._id, user.role);
    const baseOptions = getCookieOptions();

    res.cookie('refreshToken', refreshToken, {
        ...baseOptions,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
    });

    res.cookie('accessToken', accessToken, {
        ...baseOptions,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 Minutes
    });

    res.status(statusCode).json({
        success: true,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
};

/* --------------------------------
   LOGIN USER 
--------------------------------- */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  
    if (user.status !== 'active') {
      res.status(403);
      throw new Error("Account is inactive or suspended. Contact Admin.");
    }
  
    user.lastLogin = Date.now();
    await user.save();

    sendTokenResponse(user, 200, res);
});

/* --------------------------------
   LOGOUT USER 
--------------------------------- */
const logoutUser = asyncHandler(async (req, res) => {
    const baseOptions = getCookieOptions();
    res.cookie('accessToken', '', { ...baseOptions, maxAge: 0 });
    res.cookie('refreshToken', '', { ...baseOptions, maxAge: 0 });

    res.status(200).json({ success: true, message: "Logged out successfully" });
});

/* --------------------------------
   GET CURRENT USER 
--------------------------------- */
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
});

module.exports = {
    loginUser,
    logoutUser,
    getMe,
};