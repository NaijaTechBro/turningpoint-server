const express = require("express");
const router = express.Router();

const { registerPatient } = require("../controllers/patientController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post("/", protect, authorize('Admin', 'Receptionist'), registerPatient);

module.exports = router;