const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  getMe
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

/* -------- Auth -------- */
// We removed validateLogin and authLimiter here for our MVP test
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);

module.exports = router;