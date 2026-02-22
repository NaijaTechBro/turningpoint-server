const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.accessToken;

    if (token) {
        try {
            // UPDATED: Now using JWT_ACCESS_SECRET to match your token generator
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            
            req.user = await User.findById(decoded.id).select('-passwordHash');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role '${req.user.role}' is not authorized to access this route`);
        }
        next();
    };
};

module.exports = { protect, authorize };