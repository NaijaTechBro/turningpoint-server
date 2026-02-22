const express = require("express");
const router = express.Router();

const { registerPatient,
    getPatients,
    searchPatients,
    getPatientById,
    updatePatient,
    deletePatient
 } = require("../controllers/patientController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post("/", protect, authorize('Admin', 'Receptionist'), registerPatient);
router.get("/", protect, authorize('Admin', 'Receptionist'), getPatients);
router.get("/search", protect, authorize('Admin', 'Receptionist'), searchPatients);

// Add this line to handle specific patient IDs
router.route("/:id")
    .get(protect, authorize('Admin', 'Receptionist'), getPatientById)
    .put(protect, authorize('Admin', 'Receptionist'), updatePatient)
    .delete(protect, authorize('Admin'), deletePatient);

module.exports = router;