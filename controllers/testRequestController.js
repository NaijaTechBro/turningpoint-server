const asyncHandler = require("express-async-handler");
const bwipjs = require("bwip-js");
const TestRequest = require("../models/TestRequest");
const Patient = require("../models/Patient");
const PDFDocument = require('pdfkit');

const createTestRequest = asyncHandler(async (req, res) => {
    // FIXED: We now pull 'template' from the body, not 'testName'
    const { patientId, template } = req.body;

    // 1. Validate Patient Exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
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

    // Set headers to stream the PDF directly to the browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${testRequest.labReference}-Report.pdf`);

    // Initialize PDF Document
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // --- PDF Header ---
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#0056b3').text('Turning Point Diagnostics', { align: 'center' });
    doc.fontSize(10).fillColor('#666666').text('123 Health Avenue, Lagos, Nigeria | +234 800 000 0000', { align: 'center' });
    doc.moveDown(2);

    // --- Patient Details ---
    doc.fontSize(12).fillColor('#000000');
    doc.text(`Patient Name: ${testRequest.patient.firstName} ${testRequest.patient.lastName}`);
    doc.text(`Hospital Number: ${testRequest.patient.hospitalNumber}`);
    doc.text(`Lab Reference: ${testRequest.labReference}`);
    doc.text(`Date Verified: ${new Date(testRequest.updatedAt).toLocaleDateString()}`);
    doc.moveDown(2);

    // --- Test Title ---
    doc.fontSize(16).font('Helvetica-Bold').text(`${testRequest.template.testName} Report`, { align: 'center', underline: true });
    doc.moveDown(1);

    // --- Dynamic Results Layout ---
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Test Parameter', 50, doc.y, { continued: true, width: 200 });
    doc.text('Result', 250, doc.y, { continued: true, width: 100 });
    doc.text('Reference Range', 350, doc.y);
    doc.moveDown(0.5);
    
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
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
    doc.font('Helvetica-Oblique').text(`Analyzed By: ${testRequest.enteredBy.firstName} ${testRequest.enteredBy.lastName} (Scientist)`);
    doc.text(`Verified By: ${testRequest.verifiedBy.firstName} ${testRequest.verifiedBy.lastName} (Manager)`);

    // Finalize the PDF and end the stream
    doc.end();
});

// Add this helper function right above your new controller
const generatePDFBuffer = (testRequest) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // --- Draw the PDF (Same as your download controller!) ---
        doc.fontSize(24).font('Helvetica-Bold').fillColor('#0056b3').text('Turning Point Diagnostics', { align: 'center' });
        doc.fontSize(10).fillColor('#666666').text('123 Health Avenue | Contact: +234 800 000 0000', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(12).fillColor('#000000');
        doc.text(`Patient Name: ${testRequest.patient.firstName} ${testRequest.patient.lastName}`);
        doc.text(`Hospital Number: ${testRequest.patient.hospitalNumber}`);
        doc.text(`Lab Reference: ${testRequest.labReference}`);
        doc.moveDown(2);

        doc.fontSize(16).font('Helvetica-Bold').text(`${testRequest.template.testName} Report`, { align: 'center', underline: true });
        doc.moveDown(1);

        doc.fontSize(12).font('Helvetica');
        testRequest.template.schemaDefinition.forEach(field => {
            const resultValue = testRequest.resultData[field.fieldName] || 'N/A';
            const unit = field.unit ? ` ${field.unit}` : '';
            doc.text(`${field.label}: `, { continued: true }).font('Helvetica-Bold').text(`${resultValue}${unit}`);
            doc.font('Helvetica');
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

// Don't forget to export it at the bottom!
module.exports = { 
    createTestRequest, getTestByBarcode, enterTestResult, 
    verifyTestResult, downloadTestReport, sendReportToPatient 
};
