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

// @desc    Get all staff members
// @route   GET /api/v1/users
// @access  Private (Admin Only)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-passwordHash");
    
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// @desc    Get single staff member
// @route   GET /api/v1/users/:id
// @access  Private (Admin Only)
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update staff member details
// @route   PUT /api/v1/users/:id
// @access  Private (Admin Only)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Update fields if they are provided in the request body
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status;

    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status
        }
    });
});

// @desc    Delete staff member
// @route   DELETE /api/v1/users/:id
// @access  Private (Admin Only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Safety check: Prevent Admin from deleting themselves
    if (user._id.toString() === req.user.id) {
        res.status(400);
        throw new Error("You cannot delete your own admin account");
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User account removed successfully"
    });
});

module.exports = { 
    createStaffAccount, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
};