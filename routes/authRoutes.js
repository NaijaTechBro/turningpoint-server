const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

/* -------- Auth -------- */
// We removed validateLogin and authLimiter here for our MVP test
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;