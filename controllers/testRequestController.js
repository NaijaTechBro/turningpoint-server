const asyncHandler = require("express-async-handler");
const bwipjs = require("bwip-js");
const TestRequest = require("../models/TestRequest");
const Patient = require("../models/Patient");
const Template = require('../models/Template');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const createTestRequest = asyncHandler(async (req, res) => {
    // FIXED: We now pull 'template' from the body, not 'testName'
    const { patientId, template } = req.body;

    // 1. Validate Patient Exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    // NEW: Fetch the template to get the current price
    const templateDoc = await Template.findById(template);
    if (!templateDoc) {
        res.status(404);
        throw new Error("Test template not found");
    }

    // 2. Generate the Auto-Incrementing Lab Reference
    const totalTests = await TestRequest.countDocuments(); 
    const labReference = `TURPOINT-${String(totalTests + 1).padStart(4, '0')}`;

    // 3. Generate the Barcode Image (Code 128)
    let barcodeBase64 = "";
    try {
        const pngBuffer = await bwipjs.toBuffer({
            bcid: 'code128',       
            text: labReference,    
            scale: 3,              
            height: 10,            
            includetext: true,     
            textxalign: 'center',  
        });
        barcodeBase64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
    } catch (err) {
        console.error("Barcode generation failed:", err);
        res.status(500);
        throw new Error("Failed to generate specimen barcode");
    }

    // 4. Save to Database
    const testRequest = await TestRequest.create({
        patient: patient._id,
        template, // FIXED: We pass the template ID to Mongoose here
        testPrice: templateDoc.price, // FIXED: We set the price from the template      
        labReference,
        barcodeImage: barcodeBase64,
        requestedBy: req.user.id
    });

    res.status(201).json({
        success: true,
        message: "Test request generated successfully",
        data: testRequest
    });
});

// @desc    Fetch a test by scanning the barcode (labReference)
// @route   GET /api/v1/test-requests/:labReference
// @access  Private (LabScientist, Admin)
const getTestByBarcode = asyncHandler(async (req, res) => {
    const { labReference } = req.params;

    // We use .populate() to bring in the Patient details AND the Template schema!
    const testRequest = await TestRequest.findOne({ labReference })
        .populate('patient', 'firstName lastName hospitalNumber gender age')
        .populate('template', 'testName category schemaDefinition');

    if (!testRequest) {
        res.status(404);
        throw new Error("Invalid Barcode: No test found for this reference.");
    }

    res.status(200).json({
        success: true,
        data: testRequest
    });
});

// @desc    Enter lab results and update status
// @route   PUT /api/v1/test-requests/:id/results
// @access  Private (LabScientist, Admin)
const enterTestResult = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { resultData } = req.body; // This will be the dynamic JSON payload

    const testRequest = await TestRequest.findById(id);

    if (!testRequest) {
        res.status(404);
        throw new Error("Test request not found");
    }

    // Update the result payload, change status, and log WHO entered it
    testRequest.resultData = resultData;
    testRequest.status = 'RESULT_ENTERED';
    testRequest.enteredBy = req.user.id; 

    const updatedTest = await testRequest.save();

    res.status(200).json({
        success: true,
        message: "Results saved successfully. Ready for Verification.",
        data: updatedTest
    });
});

// @desc    Verify test results (Locks the record)
// @route   PUT /api/v1/test-requests/:id/verify
// @access  Private (LabManager, Admin)
const verifyTestResult = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id);

    if (!testRequest) {
        res.status(404);
        throw new Error("Test request not found");
    }

    if (testRequest.status !== 'RESULT_ENTERED') {
        res.status(400);
        throw new Error("Only tests with entered results can be verified");
    }

    testRequest.status = 'VERIFIED';
    testRequest.verifiedBy = req.user.id;
    await testRequest.save();

    res.status(200).json({
        success: true,
        message: "Test results verified and locked. Ready for printing.",
        data: testRequest
    });
});

// @desc    Generate and stream PDF Report
// @route   GET /api/v1/test-requests/:id/pdf
// @access  Private (All Staff)
const downloadTestReport = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template')
        .populate('enteredBy', 'firstName lastName')
        .populate('verifiedBy', 'firstName lastName');

    if (!testRequest || testRequest.status !== 'VERIFIED') {
        res.status(404);
        throw new Error("Report not found or not yet verified");
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${testRequest.labReference}-Report.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // --- PDF Header ---
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#eb8a1b').text('TurningPoint Health Services', { align: 'center' });
    doc.fontSize(10).fillColor('#666666').text('5, Oladipo Coker Avenue, Off Durbar Road, Amuwo-Odofin Mile 2, Lagos. | +234 818 224 6491', { align: 'center' });
    doc.moveDown(2);

    // --- Patient Details (2-Column Layout) ---
    doc.fontSize(11).fillColor('#000000');
    const startY = doc.y; // Capture the current Y position for alignment

    // Left Column
    doc.font('Helvetica-Bold').text('Patient Name: ', 50, startY, { continued: true })
       .font('Helvetica').text(`${testRequest.patient.firstName} ${testRequest.patient.lastName}`);
    
    doc.font('Helvetica-Bold').text('Hospital Number: ', 50, startY + 20, { continued: true })
       .font('Helvetica').text(`${testRequest.patient.hospitalNumber}`);

    // Right Column
    doc.font('Helvetica-Bold').text('Lab Reference: ', 320, startY, { continued: true })
       .font('Helvetica').text(`${testRequest.labReference}`);
    
    doc.font('Helvetica-Bold').text('Date Verified: ', 320, startY + 20, { continued: true })
       .font('Helvetica').text(`${new Date(testRequest.updatedAt).toLocaleDateString()}`);

    // Manually push Y down past the columns and reset X to the left margin
    doc.y = startY + 60;
    doc.x = 50;

    // --- Test Title (Bold Orange) ---
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#eb8a1b').text(`${testRequest.template.testName} Report`, 50, doc.y, { align: 'center', underline: true });
    doc.moveDown(1);

    // --- Dynamic Results Layout ---
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000'); // Reset to black for table
    doc.text('Test Parameter', 50, doc.y, { continued: true, width: 200 });
    doc.text('Result', 250, doc.y, { continued: true, width: 100 });
    doc.text('Reference Range', 350, doc.y);
    doc.moveDown(0.5);
    
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cccccc').stroke();
    doc.moveDown(0.5);

    doc.font('Helvetica');
    testRequest.template.schemaDefinition.forEach(field => {
        const resultValue = testRequest.resultData[field.fieldName] || 'N/A';
        const unit = field.unit ? ` ${field.unit}` : '';
        
        doc.text(field.label, 50, doc.y, { continued: true, width: 200 });
        doc.text(`${resultValue}${unit}`, 250, doc.y, { continued: true, width: 100 });
        doc.text(field.referenceRange || '-', 350, doc.y);
        doc.moveDown(0.5);
    });

    doc.moveDown(3);

    // --- Signatures ---
    doc.font('Helvetica-Oblique').text(`Analyzed By: ${testRequest.enteredBy?.firstName || 'Lab'} ${testRequest.enteredBy?.lastName || 'Scientist'} (Scientist)`, 50, doc.y);

    doc.end();
});

// Helper function for Email attachment
const generatePDFBuffer = (testRequest) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // --- PDF Header ---
        doc.fontSize(24).font('Helvetica-Bold').fillColor('#eb8a1b').text('TurningPoint Health Services', { align: 'center' });
        doc.fontSize(10).fillColor('#666666').text('5, Oladipo Coker Avenue, Off Durbar Road, Amuwo-Odofin Mile 2, Lagos. | +234 818 224 6491', { align: 'center' });
        doc.moveDown(2);

        // --- Patient Details (2-Column Layout) ---
        doc.fontSize(11).fillColor('#000000');
        const startY = doc.y;

        // Left Column
        doc.font('Helvetica-Bold').text('Patient Name: ', 50, startY, { continued: true })
           .font('Helvetica').text(`${testRequest.patient.firstName} ${testRequest.patient.lastName}`);
        
        doc.font('Helvetica-Bold').text('Hospital Number: ', 50, startY + 20, { continued: true })
           .font('Helvetica').text(`${testRequest.patient.hospitalNumber}`);

        // Right Column
        doc.font('Helvetica-Bold').text('Lab Reference: ', 320, startY, { continued: true })
           .font('Helvetica').text(`${testRequest.labReference}`);
        
        doc.font('Helvetica-Bold').text('Date Verified: ', 320, startY + 20, { continued: true })
           .font('Helvetica').text(`${new Date(testRequest.updatedAt).toLocaleDateString()}`);

        doc.y = startY + 60;
        doc.x = 50;

        // --- Test Title (Bold Orange) ---
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#eb8a1b').text(`${testRequest.template.testName} Report`, 50, doc.y, { align: 'center', underline: true });
        doc.moveDown(1);

        // --- Dynamic Results Layout ---
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000'); 
        doc.text('Test Parameter', 50, doc.y, { continued: true, width: 200 });
        doc.text('Result', 250, doc.y, { continued: true, width: 100 });
        doc.text('Reference Range', 350, doc.y);
        doc.moveDown(0.5);
        
        doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cccccc').stroke();
        doc.moveDown(0.5);

        doc.font('Helvetica');
        testRequest.template.schemaDefinition.forEach(field => {
            const resultValue = testRequest.resultData[field.fieldName] || 'N/A';
            const unit = field.unit ? ` ${field.unit}` : '';
            
            doc.text(field.label, 50, doc.y, { continued: true, width: 200 });
            doc.text(`${resultValue}${unit}`, 250, doc.y, { continued: true, width: 100 });
            doc.text(field.referenceRange || '-', 350, doc.y);
            doc.moveDown(0.5);
        });

        doc.end();
    });
};


// @desc    Email the verified PDF report to the patient
// @route   POST /api/v1/test-requests/:id/send-report
// @access  Private (Receptionist, Admin)
const sendReportToPatient = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template');

    if (!testRequest || testRequest.status !== 'VERIFIED') {
        res.status(400);
        throw new Error("Cannot send unverified reports. Please verify first.");
    }

    if (!testRequest.patient.email) {
        res.status(400);
        throw new Error("This patient does not have an email address on file.");
    }

    // 1. Generate the PDF into a raw data buffer
    const pdfBuffer = await generatePDFBuffer(testRequest);

    // 2. Send the Email via your Notification Service
    const { sendEmail } = require("../services/notificationService");
    
    await sendEmail({
        send_to: testRequest.patient.email,
        name: `${testRequest.patient.firstName} ${testRequest.patient.lastName}`,
        subject: `Your Lab Results: ${testRequest.template.testName}`,
        sent_from: "Turning Point <no-reply@turningpoint.com>",
        reply_to: "support@turningpoint.com",
        template: "resultTemplate",
        attachments: [
            {
                filename: `${testRequest.labReference}-Results.pdf`,
                content: pdfBuffer
            }
        ]
    });

    // 3. Update Status
    testRequest.status = 'DELIVERED';
    await testRequest.save();

    res.status(200).json({
        success: true,
        message: `Report successfully emailed to ${testRequest.patient.email}`
    });
});

// @desc    Get all test requests (For Receptionist & Scientist Dashboards)
// @route   GET /api/v1/test-requests/all
// @access  Private (Receptionist, LabScientist, Admin)
const getAllTestRequests = asyncHandler(async (req, res) => {
    // We populate the patient and template so the frontend can display their names
    const testRequests = await TestRequest.find()
        .populate('patient', 'firstName lastName hospitalNumber')
        .populate('template', 'testName category')
        .sort('-createdAt'); // Sort by newest first

    res.status(200).json({
        success: true,
        count: testRequests.length,
        data: testRequests
    });
});

// @desc    Get all test requests for a specific patient
// @route   GET /api/v1/test-requests/patient/:patientId
// @access  Private
const getPatientTestRequests = asyncHandler(async (req, res) => {
    const tests = await TestRequest.find({ patient: req.params.patientId })
        .populate('template', 'testName category')
        .sort('-createdAt');

    res.status(200).json({ success: true, count: tests.length, data: tests });
});

// @desc    Public tracking for patients
// @route   GET /api/v1/test-requests/public/track/:labRef
// @access  Public
const trackTestPublic = asyncHandler(async (req, res) => {
    // We strictly search by the unique Lab Reference receipt code
    const test = await TestRequest.findOne({ labReference: req.params.labRef.toUpperCase() })
        .populate('template', 'testName');
    
    if (!test) {
        res.status(404);
        throw new Error("Invalid Lab Reference. Please check your receipt.");
    }

    // Only return non-sensitive metadata to the public frontend
    res.status(200).json({
        success: true,
        data: {
            _id: test._id,
            labReference: test.labReference,
            status: test.status,
            // ADDED THE '?' TO PREVENT CRASHES IF TEMPLATE IS DELETED:
            testName: test.template?.testName || 'Unknown / Deleted Test',
            date: test.createdAt
        }
    });
});


// Don't forget to export it at the bottom!
module.exports = { 
    createTestRequest, getTestByBarcode, enterTestResult, 
    verifyTestResult, downloadTestReport, sendReportToPatient, getAllTestRequests, getPatientTestRequests, trackTestPublic,
};
