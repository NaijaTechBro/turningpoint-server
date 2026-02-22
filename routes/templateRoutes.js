const express = require("express");
const router = express.Router();
const { getTemplates } = require("../controllers/templateController");
const { protect } = require("../middlewares/authMiddleware");

// All logged-in staff need to be able to see the list of available tests
router.get("/", protect, getTemplates);

module.exports = router;