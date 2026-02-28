const asyncHandler = require("express-async-handler");
const bwipjs = require("bwip-js");
const TestRequest = require("../models/TestRequest");
const Patient = require("../models/Patient");
const Template = require('../models/Template');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');


// --- ADD THIS HELPER TO DRAW YOUR LOGO ---
const drawLogo = (doc, x, y, scale = 0.6) => {
    doc.save();
    doc.translate(x, y);
    doc.scale(scale);
    // Orange shape
    doc.path('M50 85 C 50 85 15 55 15 35 C 15 20 30 15 40 25 C 50 35 50 35 50 35 C 50 35 50 35 60 25 C 70 15 85 20 85 35 C 85 55 50 85 50 85 Z').fill('#FF6B35');
    // Green swoosh
    doc.path('M10 60 Q 25 30 50 35').lineWidth(6).lineCap('round').stroke('#228B22');
    // White Plus
    doc.roundedRect(44, 32, 12, 26, 2).fill('#FFFFFF');
    doc.roundedRect(37, 39, 26, 12, 2).fill('#FFFFFF');
    doc.restore();
};

// --- REUSABLE PDF BUILDER (Fixes Alignment & Text Spilling) ---
const buildPDFContent = (doc, testRequest) => {
    // 1. Header with Native Vector Logo
    drawLogo(doc, 50, 40);
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#eb8a1b').text('Turning Point', 90, 45);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#228B22').text('HEALTH SERVICES', 92, 70, { characterSpacing: 2 });
    
    doc.fontSize(9).font('Helvetica').fillColor('#666666').text('5, Oladipo Coker Avenue, Off Durbar Road,', 300, 50, { align: 'right' });
    doc.text('Amuwo-Odofin Mile 2, Lagos.', 300, 62, { align: 'right' });
    doc.text('+234 818 224 6491', 300, 74, { align: 'right' });
    
    doc.moveDown(3);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#eeeeee').stroke();
    doc.moveDown(1);

    // 2. Patient Details (2-Column Layout)
    doc.fontSize(10).fillColor('#000000');
    const startY = doc.y;

    // Left Column
    doc.font('Helvetica-Bold').text('Patient Name:', 50, startY, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.patient.firstName} ${testRequest.patient.lastName}`, 140, startY);
    
    doc.font('Helvetica-Bold').text('Hospital No:', 50, startY + 20, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.patient.hospitalNumber}`, 140, startY + 20);

    const ageDisplay = testRequest.patient.age ? `${testRequest.patient.age} Yrs` : 'N/A';
    doc.font('Helvetica-Bold').text('Age / Gender:', 50, startY + 40, { width: 90, continued: false });
    doc.font('Helvetica').text(`${ageDisplay} / ${testRequest.patient.gender}`, 140, startY + 40);

    // Right Column
    doc.font('Helvetica-Bold').text('Lab Reference:', 320, startY, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.labReference}`, 410, startY);
    
    doc.font('Helvetica-Bold').text('Date Verified:', 320, startY + 20, { width: 90, continued: false });
    doc.font('Helvetica').text(`${new Date(testRequest.updatedAt).toLocaleDateString('en-GB')}`, 410, startY + 20);

    if (testRequest.patient.referringDoctor) {
        doc.font('Helvetica-Bold').text('Ref. Doctor:', 320, startY + 40, { width: 90, continued: false });
        doc.font('Helvetica').text(`${testRequest.patient.referringDoctor}`, 410, startY + 40);
    }

    doc.y = startY + 80;

    // 3. Test Title
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#eb8a1b')
       .text(`${testRequest.template.testName.toUpperCase()} REPORT`, 50, doc.y, { align: 'center' });
    doc.moveDown(1.5);

    // 4. Dynamic Results Layout (Fixes Text Spilling!)
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000');
    
    // Check if the template contains ONLY a text area (like X-Ray/Scans)
    const isTextReportOnly = testRequest.template.schemaDefinition.length === 1 && testRequest.template.schemaDefinition[0].inputType === 'textarea';

    if (isTextReportOnly) {
        // Render as a full-page document instead of a table
        const field = testRequest.template.schemaDefinition[0];
        const resultValue = testRequest.resultData?.[field.fieldName] || 'No report entered.';
        
        doc.font('Helvetica').text(resultValue, 50, doc.y, {
            width: 500,
            align: 'justify',
            lineGap: 4
        });
    } else {
        // Render as a 3-Column Table for Lab Results
        const tableHeaderY = doc.y;
        doc.text('TEST PARAMETER', 50, tableHeaderY, { width: 190 });
        doc.text('RESULT', 250, tableHeaderY, { width: 140 });
        doc.text('REFERENCE RANGE', 400, tableHeaderY, { width: 150 });
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cccccc').stroke();
        doc.moveDown(0.5);

        doc.font('Helvetica');
        testRequest.template.schemaDefinition.forEach(field => {
            const resultValue = testRequest.resultData?.[field.fieldName] || 'N/A';
            const unit = field.unit ? ` ${field.unit}` : '';
            
            const labelText = field.label || '';
            const valueText = `${resultValue}${unit}`;
            const refText = field.referenceRange || '-';

            // Calculate height of tallest text block so rows don't overlap
            const h1 = doc.heightOfString(labelText, { width: 190 });
            const h2 = doc.heightOfString(valueText, { width: 140 });
            const h3 = doc.heightOfString(refText, { width: 150 });
            const rowHeight = Math.max(h1, h2, h3);
            
            // Page Break logic
            if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom - 50) {
                doc.addPage();
            }

            const currentY = doc.y;

            // Handle textareas in tables (like MicroBio Sensitivities)
            if (field.inputType === 'textarea') {
                doc.font('Helvetica-Bold').text(labelText, 50, currentY, { width: 500 });
                doc.font('Helvetica').text(valueText, 50, currentY + 15, { width: 500 });
                doc.y = currentY + 15 + doc.heightOfString(valueText, { width: 500 }) + 10;
            } else {
                // Standard row
                doc.text(labelText, 50, currentY, { width: 190 });
                doc.font('Helvetica-Bold').text(valueText, 250, currentY, { width: 140 });
                doc.font('Helvetica').text(refText, 400, currentY, { width: 150 });
                doc.y = currentY + rowHeight + 10;
            }
        });
    }

    // 5. Signatures
    doc.moveDown(4);
    const scientistName = testRequest.verifiedBy ? `${testRequest.verifiedBy.firstName} ${testRequest.verifiedBy.lastName}` : 'Lab Scientist';
    doc.moveTo(50, doc.y).lineTo(200, doc.y).strokeColor('#000000').stroke();
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text(scientistName, 50, doc.y);
    doc.font('Helvetica-Oblique').fontSize(8).text('Verified By', 50, doc.y);
};

// --- RECEPTIONIST/STAFF DOWNLOAD ROUTE ---
const downloadTestReport = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template')
        .populate('enteredBy', 'firstName lastName')
        .populate('verifiedBy', 'firstName lastName');

    if (!testRequest || testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED') {
        res.status(404);
        throw new Error("Report not found or not yet verified");
    }

    if (!testRequest.template) {
        res.status(400);
        throw new Error("Cannot generate PDF: The original test template was deleted from the database.");
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${testRequest.labReference}-Report.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);
    buildPDFContent(doc, testRequest);
    doc.end();
});

// --- NEW: PUBLIC PATIENT DOWNLOAD ROUTE ---
const downloadPublicTestReport = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template')
        .populate('verifiedBy', 'firstName lastName');

    // Make sure public can ONLY download verified or delivered tests!
    if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
        res.status(404);
        throw new Error("Report not available for download.");
    }

    if (!testRequest.template) {
        res.status(400);
        throw new Error("Cannot generate PDF: Document structure missing.");
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${testRequest.labReference}-Report.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);
    buildPDFContent(doc, testRequest);
    doc.end();
});

// --- EMAIL BUFFER ROUTE ---
const generatePDFBuffer = (testRequest) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        buildPDFContent(doc, testRequest);
        doc.end();
    });
};

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

// @desc    Email the verified PDF report to the patient
// @route   POST /api/v1/test-requests/:id/send-report
// @access  Private (Receptionist, Admin)
const sendReportToPatient = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template');

    // FIX: Allow sending if it's VERIFIED -OR- already DELIVERED (for resending)
    if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
        res.status(400);
        throw new Error("Cannot send unverified reports. Please verify first.");
    }

    if (!testRequest.template) {
        res.status(400);
        throw new Error("Cannot send email: Test template structure is missing.");
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
    verifyTestResult, downloadTestReport, sendReportToPatient, getAllTestRequests, getPatientTestRequests, trackTestPublic, downloadPublicTestReport,
};
