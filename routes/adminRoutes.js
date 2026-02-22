const express = require('express');
const router = express.Router();
const { registerPatient } = require('../controllers/patientController');
const { createTestRequest } = require('../controllers/testRequestController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Only Admins and Receptionists can create patients and order tests
router.post('/patients', protect, authorize('Admin', 'Receptionist'), registerPatient);
router.post('/test-requests', protect, authorize('Admin', 'Receptionist'), createTestRequest);

module.exports = router;