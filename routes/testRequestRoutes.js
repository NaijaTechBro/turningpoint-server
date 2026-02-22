const express = require("express");
const router = express.Router();
const { 
    createTestRequest, 
    getTestByBarcode, 
    enterTestResult,
    verifyTestResult,
    downloadTestReport,
    sendReportToPatient,

} = require("../controllers/testRequestController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Receptionist & Admin: Order the test
router.post("/", protect, authorize('Admin', 'Receptionist'), createTestRequest);

// Lab Scientist & Admin: Scan barcode and enter results
router.get("/:labReference", protect, authorize('Admin', 'LabScientist'), getTestByBarcode);
router.put("/:id/results", protect, authorize('Admin', 'LabScientist'), enterTestResult);
// Receptionist & Admin: Send the verified report to the patient's email
router.post("/:id/send-report", protect, authorize('Admin', 'Receptionist'), sendReportToPatient);

// Lab Manager & Admin: Verify and lock the results
router.put("/:id/verify", protect, authorize('Admin', 'LabScientist'), verifyTestResult);

// Anyone logged in can download the final PDF
router.get("/:id/pdf", protect, downloadTestReport);

module.exports = router;