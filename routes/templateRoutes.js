

const express = require("express");
const router = express.Router();
const { getTemplates, createTemplate, deleteTemplate } = require("../controllers/templateController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// PUBLIC ENTRANCE: No 'protect' middleware here!
// Anyone on the internet can see the list of tests
router.get("/public", getTemplates); 

// PROTECTED ENTRANCES: Only logged-in staff
router.get("/", protect, getTemplates); // For staff dashboards
router.post("/", protect, authorize('Admin'), createTemplate);
router.delete("/:id", protect, authorize('Admin'), deleteTemplate);

module.exports = router;