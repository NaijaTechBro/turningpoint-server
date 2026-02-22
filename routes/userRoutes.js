const express = require("express");
const router = express.Router();
const { createStaffAccount } = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Only logged-in Admins can create new staff accounts
router.post("/", protect, authorize('Admin'), createStaffAccount);

module.exports = router;