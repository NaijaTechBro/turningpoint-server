
// const express = require("express");
// const router = express.Router();
// const { 
//     createTestRequest, 
//     getAllTestRequests,
//     getTestByBarcode, 
//     enterTestResult,
//     verifyTestResult,
//     downloadTestReport,
//     sendReportToPatient,
//     getPatientTestRequests,
//     trackTestPublic 
// } = require("../controllers/testRequestController");
// const { protect, authorize } = require("../middlewares/authMiddleware");

// // ==========================================
// // 1. PUBLIC ROUTES (No 'protect' middleware here!)
// // ==========================================
// router.get("/public/track/:labRef", trackTestPublic);
// router.get("/public/pdf/:id", downloadTestReport);

// // ==========================================
// // 2. PROTECTED ROUTES (Must come AFTER public routes)
// // ==========================================
// router.post("/", protect, authorize('Admin', 'Receptionist'), createTestRequest);
// router.get("/all", protect, authorize('Admin', 'Receptionist', 'LabScientist'), getAllTestRequests);
// router.get("/patient/:patientId", protect, authorize('Admin', 'Receptionist', 'LabScientist'), getPatientTestRequests);

// // Dynamic Routes (These catch anything else, so they must be at the bottom)
// router.get("/:labReference", protect, authorize('Admin', 'LabScientist'), getTestByBarcode);
// router.put("/:id/results", protect, authorize('Admin', 'LabScientist'), enterTestResult);
// router.post("/:id/send-report", protect, authorize('Admin', 'Receptionist'), sendReportToPatient);
// router.put("/:id/verify", protect, authorize('Admin', 'LabScientist'), verifyTestResult);
// router.get("/:id/pdf", protect, downloadTestReport);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { 
    createTestRequest, 
    getAllTestRequests,
    getTestByBarcode, 
    enterTestResult,
    verifyTestResult,
    downloadTestReport,
    downloadPublicTestReport, // <-- NEW: Added this to imports!
    sendReportToPatient,
    getPatientTestRequests,
    trackTestPublic 
} = require("../controllers/testRequestController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// ==========================================
// 1. PUBLIC ROUTES (No 'protect' middleware here!)
// ==========================================
router.get("/public/track/:labRef", trackTestPublic);
router.get("/public/pdf/:id", downloadPublicTestReport); // <-- FIXED: Attached the correct public function here!

// ==========================================
// 2. PROTECTED ROUTES (Must come AFTER public routes)
// ==========================================
router.post("/", protect, authorize('Admin', 'Receptionist'), createTestRequest);
router.get("/all", protect, authorize('Admin', 'Receptionist', 'LabScientist'), getAllTestRequests);
router.get("/patient/:patientId", protect, authorize('Admin', 'Receptionist', 'LabScientist'), getPatientTestRequests);

// Dynamic Routes (These catch anything else, so they must be at the bottom)
router.get("/:labReference", protect, authorize('Admin', 'LabScientist'), getTestByBarcode);
router.put("/:id/results", protect, authorize('Admin', 'LabScientist'), enterTestResult);
router.post("/:id/send-report", protect, authorize('Admin', 'Receptionist', 'LabScientist'), sendReportToPatient);
router.put("/:id/verify", protect, authorize('Admin', 'LabScientist'), verifyTestResult);
router.get("/:id/pdf", protect, downloadTestReport);

module.exports = router;