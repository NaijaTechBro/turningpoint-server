const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Ensure this path matches your User model

// @desc    Register a new staff member
// @route   POST /api/v1/users
// @access  Private (Admin Only)
const createStaffAccount = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // 1. Check if the email is already in use
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("A user with this email already exists");
    }

    // 2. Hash the initial password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create the User
    const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash,
        role // 'Admin', 'Receptionist', or 'LabScientist'
    });

    if (user) {
        res.status(201).json({
            success: true,
            message: `${role} account created successfully for ${firstName} ${lastName}`,
            data: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

module.exports = { createStaffAccount };