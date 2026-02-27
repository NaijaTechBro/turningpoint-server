const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateTokens = require("../utils/generateTokens");
const { sendEmail } = require("../services/notificationService")

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

/* --------------------------------
   FORGOT PASSWORD 
--------------------------------- */
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404);
        throw new Error("There is no user with that email");
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url (Point this to your Frontend route!)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
        await sendEmail({
            send_to: user.email,
            name: `${user.firstName} ${user.lastName}`,
            subject: "Password Reset Request",
            sent_from: "Turning Point IT <it@turningpoint.com>",
            reply_to: "it@turningpoint.com",
            // You can use a template, or just pass raw text/HTML depending on your email service setup
            html: `You requested a password reset. Please click this link to reset it: <a href="${resetUrl}">${resetUrl}</a>. This link expires in 10 minutes.`
        });

        res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500);
        throw new Error("Email could not be sent");
    }
});

/* --------------------------------
   RESET PASSWORD (Using the emailed token)
--------------------------------- */
const resetPassword = asyncHandler(async (req, res) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } // Ensure it hasn't expired
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired token");
    }

    // Hash the new password and save it
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(req.body.password, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful. You can now log in." });
});

/* --------------------------------
   CHANGE PASSWORD
--------------------------------- */
const updatePassword = asyncHandler(async (req, res) => {
    // req.user.id comes from your protect/auth middleware
    const user = await User.findById(req.user.id).select('+passwordHash');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        res.status(401);
        throw new Error("Current password is incorrect");
    }

    // Hash and update the new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(req.body.newPassword, salt);
    
    await user.save();

    // Re-issue tokens so they don't get logged out
    sendTokenResponse(user, 200, res); 
});

module.exports = {
    loginUser,
    logoutUser,
    getMe,
    forgotPassword,
    resetPassword,
    updatePassword
};