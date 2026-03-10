
// const asyncHandler = require("express-async-handler");
// const bwipjs = require("bwip-js");
// const TestRequest = require("../models/TestRequest");
// const Patient = require("../models/Patient");
// const Template = require('../models/Template');
// const PDFDocument = require('pdfkit');
// const path = require('path');
// const fs = require('fs');

// // --- REUSABLE PDF BUILDER (Fixes Alignment & Text Spilling) ---
// const buildPDFContent = (doc, testRequest) => {
//     const watermarkPath = path.join(__dirname, '../assets/icon.png'); 
//     const letterheadPath = path.join(__dirname, '../assets/letterhead.png'); 
    
//     // --- HELPER: ADD WATERMARK ---
//     const addWatermark = () => {
//         try {
//             if (fs.existsSync(watermarkPath)) {
//                 doc.save();
//                 doc.opacity(0.10); // 10% opacity for a bold but readable watermark
//                 doc.image(watermarkPath, (doc.page.width - 400) / 2, (doc.page.height - 400) / 2, { width: 400 });
//                 doc.restore();
//             }
//         } catch (err) {}
//     };

//     // Draw watermark on the first page immediately
//     addWatermark();
    
//     // Ensure the watermark is drawn on any new pages if the report is very long
//     doc.on('pageAdded', addWatermark);

//     // ==========================================
//     // 1. HEADER (FULL-WIDTH LETTERHEAD ONLY)
//     // ==========================================
//     doc.y = 30; // Start at the very top of the page
    
//     try {
//         if (fs.existsSync(letterheadPath)) {
//             // We use the full width (520) so your new design fills the top of the A4 page perfectly.
//             // By omitting X and Y coordinates here, PDFKit automatically places it at doc.y
//             // and moves the cursor safely below it.
//             doc.image(letterheadPath, { width: 520, align: 'center' }); 
//         }
//     } catch (err) {
//         console.warn("Failed to load letterhead image:", err.message);
//     }

//     // Since PDFKit automatically adjusted doc.y after the image, we just need a little breathing room.
//     doc.moveDown(1);
    
//     // Draw the separator line exactly below your new, complete letterhead image
//     doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#eeeeee').stroke();
//     doc.moveDown(1.5);

//     // NOTE: All hardcoded address/phone/email text has been removed from here
//     // because you are adding it directly to the letterhead.png file.

//     // ==========================================
//     // 2. PATIENT DETAILS (2-Column Layout)
//     // ==========================================
//     // This section remains exactly the same as the base layout you liked.
//     doc.fontSize(10).fillColor('#000000');
    
//     const startY = doc.y;

//     // ----- Left Column -----
//     doc.font('Helvetica-Bold').text('Patient Name:', 50, startY, { width: 90, continued: false });
//     doc.font('Helvetica').text(`${testRequest.patient.firstName} ${testRequest.patient.lastName}`, 140, startY);
    
//     doc.font('Helvetica-Bold').text('Lab No:', 50, startY + 20, { width: 90, continued: false });
//     doc.font('Helvetica').text(`${testRequest.patient.hospitalNumber}`, 140, startY + 20);

//     const ageDisplay = testRequest.patient.age ? `${testRequest.patient.age} Yrs` : 'N/A';
//     doc.font('Helvetica-Bold').text('Age / Gender:', 50, startY + 40, { width: 90, continued: false });
//     doc.font('Helvetica').text(`${ageDisplay} / ${testRequest.patient.gender}`, 140, startY + 40);

//     // ----- Right Column -----
//     doc.font('Helvetica-Bold').text('Lab Reference:', 320, startY, { width: 90, continued: false });
//     doc.font('Helvetica').text(`${testRequest.labReference}`, 410, startY);
    
//     doc.font('Helvetica-Bold').text('Date Verified:', 320, startY + 20, { width: 90, continued: false });
//     doc.font('Helvetica').text(`${new Date(testRequest.updatedAt).toLocaleDateString('en-GB')}`, 410, startY + 20);

//     // Referring Doctor placed safely directly under the Date Verified
//     if (testRequest.patient.referringDoctor) {
//         doc.font('Helvetica-Bold').text('Referring Dr:', 320, startY + 40, { width: 90, continued: false });
//         doc.font('Helvetica').text(`${testRequest.patient.referringDoctor}`, 410, startY + 40);
//     }

//     doc.y = startY + 70; // Push cursor safely down past the entire patient details block

//     // ==========================================
//     // 3. TEST TITLE (Deep, Bold Orange)
//     // ==========================================
//     doc.fontSize(15).font('Helvetica-Bold').fillColor('#C04000')
//        .text(`${testRequest.template.testName.toUpperCase()} REPORT`, 50, doc.y, { align: 'center' });
//     doc.moveDown(1.5);

//     // ==========================================
//     // 4. DYNAMIC RESULTS LAYOUT
//     // ==========================================
//     doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000');
    
//     const isTextReportOnly = testRequest.template.schemaDefinition.length === 1 && testRequest.template.schemaDefinition[0].inputType === 'textarea';

//     if (isTextReportOnly) {
//         const field = testRequest.template.schemaDefinition[0];
//         const resultValue = testRequest.resultData?.[field.fieldName] || 'No report entered.';
        
//         doc.font('Helvetica').text(resultValue, 50, doc.y, {
//             width: 500,
//             align: 'justify',
//             lineGap: 4
//         });
//     } else {
//         const tableHeaderY = doc.y;
//         doc.text('TEST PARAMETER', 50, tableHeaderY, { width: 190 });
//         doc.text('RESULT', 250, tableHeaderY, { width: 140 });
//         doc.text('REFERENCE RANGE', 400, tableHeaderY, { width: 150 });
//         doc.moveDown(0.5);
//         doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cccccc').stroke();
//         doc.moveDown(0.5);

//         doc.font('Helvetica');
//         testRequest.template.schemaDefinition.forEach(field => {
//             const resultValue = testRequest.resultData?.[field.fieldName] || 'N/A';
//             const unit = field.unit ? ` ${field.unit}` : '';
            
//             const labelText = field.label || '';
//             const valueText = `${resultValue}${unit}`;
//             const refText = field.referenceRange || '-';

//             const h1 = doc.heightOfString(labelText, { width: 190 });
//             const h2 = doc.heightOfString(valueText, { width: 140 });
//             const h3 = doc.heightOfString(refText, { width: 150 });
//             const rowHeight = Math.max(h1, h2, h3);
            
//             if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom - 50) {
//                 doc.addPage();
//             }

//             const currentY = doc.y;

//             if (field.inputType === 'textarea') {
//                 doc.font('Helvetica-Bold').text(labelText, 50, currentY, { width: 500 });
//                 doc.font('Helvetica').text(valueText, 50, currentY + 15, { width: 500 });
//                 doc.y = currentY + 15 + doc.heightOfString(valueText, { width: 500 }) + 10;
//             } else {
//                 doc.text(labelText, 50, currentY, { width: 190 });
//                 doc.font('Helvetica-Bold').text(valueText, 250, currentY, { width: 140 });
//                 doc.font('Helvetica').text(refText, 400, currentY, { width: 150 });
//                 doc.y = currentY + rowHeight + 10;
//             }
//         });
//     }

//     // ==========================================
//     // 5. SIGNATURES
//     // ==========================================
//     doc.moveDown(4);
//     const scientistName = testRequest.verifiedBy ? `${testRequest.verifiedBy.firstName} ${testRequest.verifiedBy.lastName}` : 'Lab Scientist';
//     doc.moveTo(50, doc.y).lineTo(200, doc.y).strokeColor('#000000').stroke();
//     doc.moveDown(0.5);
//     doc.font('Helvetica-Bold').text(scientistName, 50, doc.y);
//     doc.font('Helvetica-Oblique').fontSize(8).text('Verified By', 50, doc.y);
// };

// // --- ROUTES ---
// const downloadTestReport = asyncHandler(async (req, res) => {
//     const testRequest = await TestRequest.findById(req.params.id)
//         .populate('patient')
//         .populate('template')
//         .populate('enteredBy', 'firstName lastName')
//         .populate('verifiedBy', 'firstName lastName');

//     if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
//         res.status(404);
//         throw new Error("Report not found or not yet verified");
//     }

//     if (!testRequest.template) {
//         res.status(400);
//         throw new Error("Cannot generate PDF: The original test template was deleted from the database.");
//     }

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename=${testRequest.labReference}-Report.pdf`);

//     const doc = new PDFDocument({ margin: 50 });
//     doc.pipe(res);
//     buildPDFContent(doc, testRequest);
//     doc.end();
// });

// const downloadPublicTestReport = asyncHandler(async (req, res) => {
//     const testRequest = await TestRequest.findById(req.params.id)
//         .populate('patient')
//         .populate('template')
//         .populate('verifiedBy', 'firstName lastName');

//     if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
//         res.status(404);
//         throw new Error("Report not available for download.");
//     }

//     if (!testRequest.template) {
//         res.status(400);
//         throw new Error("Cannot generate PDF: Document structure missing.");
//     }

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=${testRequest.labReference}-Report.pdf`);

//     const doc = new PDFDocument({ margin: 50 });
//     doc.pipe(res);
//     buildPDFContent(doc, testRequest);
//     doc.end();
// });

// const generatePDFBuffer = (testRequest) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument({ margin: 50 });
//         const buffers = [];
        
//         doc.on('data', buffers.push.bind(buffers));
//         doc.on('end', () => resolve(Buffer.concat(buffers)));
//         doc.on('error', reject);

//         buildPDFContent(doc, testRequest);
//         doc.end();
//     });
// };

// const createTestRequest = asyncHandler(async (req, res) => {
//     const { patientId, template } = req.body;

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//         res.status(404);
//         throw new Error("Patient not found");
//     }

//     const templateDoc = await Template.findById(template);
//     if (!templateDoc) {
//         res.status(404);
//         throw new Error("Test template not found");
//     }

//     const totalTests = await TestRequest.countDocuments(); 
//     const labReference = `TURPOINT-${String(totalTests + 1).padStart(4, '0')}`;

//     let barcodeBase64 = "";
//     try {
//         const pngBuffer = await bwipjs.toBuffer({
//             bcid: 'code128',       
//             text: labReference,    
//             scale: 3,              
//             height: 10,            
//             includetext: true,     
//             textxalign: 'center',  
//         });
//         barcodeBase64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
//     } catch (err) {
//         console.error("Barcode generation failed:", err);
//         res.status(500);
//         throw new Error("Failed to generate specimen barcode");
//     }

//     const testRequest = await TestRequest.create({
//         patient: patient._id,
//         template, 
//         testPrice: templateDoc.price,       
//         labReference,
//         barcodeImage: barcodeBase64,
//         requestedBy: req.user.id
//     });

//     res.status(201).json({
//         success: true,
//         message: "Test request generated successfully",
//         data: testRequest
//     });
// });

// const getTestByBarcode = asyncHandler(async (req, res) => {
//     const { labReference } = req.params;

//     const testRequest = await TestRequest.findOne({ labReference })
//         .populate('patient', 'firstName lastName hospitalNumber gender age referringDoctor')
//         .populate('template', 'testName category schemaDefinition');

//     if (!testRequest) {
//         res.status(404);
//         throw new Error("Invalid Barcode: No test found for this reference.");
//     }

//     res.status(200).json({
//         success: true,
//         data: testRequest
//     });
// });

// const enterTestResult = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { resultData } = req.body; 

//     const testRequest = await TestRequest.findById(id);

//     if (!testRequest) {
//         res.status(404);
//         throw new Error("Test request not found");
//     }

//     testRequest.resultData = resultData;
//     testRequest.status = 'RESULT_ENTERED';
//     testRequest.enteredBy = req.user.id; 

//     const updatedTest = await testRequest.save();

//     res.status(200).json({
//         success: true,
//         message: "Results saved successfully. Ready for Verification.",
//         data: updatedTest
//     });
// });

// const verifyTestResult = asyncHandler(async (req, res) => {
//     const testRequest = await TestRequest.findById(req.params.id);

//     if (!testRequest) {
//         res.status(404);
//         throw new Error("Test request not found");
//     }

//     if (testRequest.status !== 'RESULT_ENTERED') {
//         res.status(400);
//         throw new Error("Only tests with entered results can be verified");
//     }

//     testRequest.status = 'VERIFIED';
//     testRequest.verifiedBy = req.user.id;
//     await testRequest.save();

//     res.status(200).json({
//         success: true,
//         message: "Test results verified and locked. Ready for printing.",
//         data: testRequest
//     });
// });

// const sendReportToPatient = asyncHandler(async (req, res) => {
//     const testRequest = await TestRequest.findById(req.params.id)
//         .populate('patient')
//         .populate('template');

//     if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
//         res.status(400);
//         throw new Error("Cannot send unverified reports. Please verify first.");
//     }

//     if (!testRequest.template) {
//         res.status(400);
//         throw new Error("Cannot send report: Test template structure is missing.");
//     }

//     let emailSent = false;

//     if (testRequest.patient.email) {
//         try {
//             const pdfBuffer = await generatePDFBuffer(testRequest);
//             const { sendEmail } = require("../services/notificationService");
            
//             await sendEmail({
//                 send_to: testRequest.patient.email,
//                 name: `${testRequest.patient.firstName} ${testRequest.patient.lastName}`,
//                 subject: `Your Lab Results: ${testRequest.template.testName}`,
//                 sent_from: "Turning Point <no-reply@turningpoint.com>",
//                 reply_to: "support@turningpoint.com",
//                 template: "resultTemplate",
//                 attachments: [{ filename: `${testRequest.labReference}-Results.pdf`, content: pdfBuffer }]
//             });
//             emailSent = true;
//         } catch (error) {
//             console.error("Email dispatch failed:", error);
//         }
//     }

//     testRequest.status = 'DELIVERED';
//     await testRequest.save();

//     res.status(200).json({
//         success: true,
//         message: emailSent ? "Email sent successfully." : "Marked as delivered (No email on file).",
//         emailSent
//     });
// });

// const getAllTestRequests = asyncHandler(async (req, res) => {
//     const testRequests = await TestRequest.find()
//         .populate('patient', 'firstName lastName hospitalNumber email phone referringDoctor')
//         .populate('template', 'testName category')
//         .sort('-createdAt'); 

//     res.status(200).json({
//         success: true,
//         count: testRequests.length,
//         data: testRequests
//     });
// });

// const getPatientTestRequests = asyncHandler(async (req, res) => {
//     const tests = await TestRequest.find({ patient: req.params.patientId })
//         .populate('template', 'testName category')
//         .sort('-createdAt');

//     res.status(200).json({ success: true, count: tests.length, data: tests });
// });

// const trackTestPublic = asyncHandler(async (req, res) => {
//     const test = await TestRequest.findOne({ labReference: req.params.labRef.toUpperCase() })
//         .populate('template', 'testName');
    
//     if (!test) {
//         res.status(404);
//         throw new Error("Invalid Lab Reference. Please check your receipt.");
//     }

//     res.status(200).json({
//         success: true,
//         data: {
//             _id: test._id,
//             labReference: test.labReference,
//             status: test.status,
//             testName: test.template?.testName || 'Unknown / Deleted Test',
//             date: test.createdAt
//         }
//     });
// });

// module.exports = { 
//     createTestRequest, getTestByBarcode, enterTestResult, 
//     verifyTestResult, downloadTestReport, sendReportToPatient, getAllTestRequests, getPatientTestRequests, trackTestPublic, downloadPublicTestReport,
// };

const asyncHandler = require("express-async-handler");
const bwipjs = require("bwip-js");
const TestRequest = require("../models/TestRequest");
const Patient = require("../models/Patient");
const Template = require('../models/Template');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// --- REUSABLE PDF BUILDER (Fixes Alignment & Text Spilling) ---
const buildPDFContent = (doc, testRequest) => {
    const watermarkPath = path.join(__dirname, '../assets/icon.png'); 
    const letterheadPath = path.join(__dirname, '../assets/letterhead.png'); 
    
    // --- HELPER: ADD WATERMARK ---
    const addWatermark = () => {
        try {
            if (fs.existsSync(watermarkPath)) {
                doc.save();
                doc.opacity(0.10); // 10% opacity for a bold but readable watermark
                doc.image(watermarkPath, (doc.page.width - 400) / 2, (doc.page.height - 400) / 2, { width: 400 });
                doc.restore();
            }
        } catch (err) {}
    };

    // Draw watermark on the first page immediately
    addWatermark();
    
    // Ensure the watermark is drawn on any new pages if the report is very long
    doc.on('pageAdded', addWatermark);

    // ==========================================
    // 1. HEADER (FULL-WIDTH LETTERHEAD ONLY)
    // ==========================================
    doc.y = 30; // Start at the very top of the page
    
    try {
        if (fs.existsSync(letterheadPath)) {
            // We use the full width (520) so your new design fills the top of the A4 page perfectly.
            // By omitting X and Y coordinates here, PDFKit automatically places it at doc.y
            // and moves the cursor safely below it.
            doc.image(letterheadPath, { width: 520, align: 'center' }); 
        }
    } catch (err) {
        console.warn("Failed to load letterhead image:", err.message);
    }

    // Since PDFKit automatically adjusted doc.y after the image, we just need a little breathing room.
    doc.moveDown(1);
    
    // Draw the separator line exactly below your new, complete letterhead image
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#eeeeee').stroke();
    doc.moveDown(1.5);

    // ==========================================
    // 2. PATIENT DETAILS (2-Column Layout)
    // ==========================================
    doc.fontSize(10).fillColor('#000000');
    
    const startY = doc.y;

    // ----- Left Column -----
    doc.font('Helvetica-Bold').text('Patient Name:', 50, startY, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.patient.firstName} ${testRequest.patient.lastName}`, 140, startY);
    
    doc.font('Helvetica-Bold').text('Lab No:', 50, startY + 20, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.patient.hospitalNumber}`, 140, startY + 20);

    const ageDisplay = testRequest.patient.age ? `${testRequest.patient.age} Yrs` : 'N/A';
    doc.font('Helvetica-Bold').text('Age / Gender:', 50, startY + 40, { width: 90, continued: false });
    doc.font('Helvetica').text(`${ageDisplay} / ${testRequest.patient.gender}`, 140, startY + 40);

    // ----- Right Column -----
    doc.font('Helvetica-Bold').text('Lab Reference:', 320, startY, { width: 90, continued: false });
    doc.font('Helvetica').text(`${testRequest.labReference}`, 410, startY);
    
    // NEW: Date Registered (Uses the createdAt timestamp)
    doc.font('Helvetica-Bold').text('Date Registered:', 320, startY + 20, { width: 90, continued: false });
    doc.font('Helvetica').text(`${new Date(testRequest.createdAt).toLocaleDateString('en-GB')}`, 410, startY + 20);

    // MOVED DOWN: Date Verified
    doc.font('Helvetica-Bold').text('Date Verified:', 320, startY + 40, { width: 90, continued: false });
    doc.font('Helvetica').text(`${new Date(testRequest.updatedAt).toLocaleDateString('en-GB')}`, 410, startY + 40);

    // MOVED DOWN: Referring Doctor
    if (testRequest.patient.referringDoctor) {
        doc.font('Helvetica-Bold').text('Referring Dr:', 320, startY + 60, { width: 90, continued: false });
        doc.font('Helvetica').text(`${testRequest.patient.referringDoctor}`, 410, startY + 60);
    }

    // Increased this spacing to 90 to ensure it clears the newly added row
    doc.y = startY + 90; 

    // ==========================================
    // 3. TEST TITLE (Deep, Bold Orange)
    // ==========================================
    doc.fontSize(15).font('Helvetica-Bold').fillColor('#C04000')
       .text(`${testRequest.template.testName.toUpperCase()} REPORT`, 50, doc.y, { align: 'center' });
    doc.moveDown(1.5);

    // ==========================================
    // 4. DYNAMIC RESULTS LAYOUT
    // ==========================================
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000');
    
    const isTextReportOnly = testRequest.template.schemaDefinition.length === 1 && testRequest.template.schemaDefinition[0].inputType === 'textarea';

    if (isTextReportOnly) {
        const field = testRequest.template.schemaDefinition[0];
        const resultValue = testRequest.resultData?.[field.fieldName] || 'No report entered.';
        
        doc.font('Helvetica').text(resultValue, 50, doc.y, {
            width: 500,
            align: 'justify',
            lineGap: 4
        });
    } else {
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

            const h1 = doc.heightOfString(labelText, { width: 190 });
            const h2 = doc.heightOfString(valueText, { width: 140 });
            const h3 = doc.heightOfString(refText, { width: 150 });
            const rowHeight = Math.max(h1, h2, h3);
            
            if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom - 50) {
                doc.addPage();
            }

            const currentY = doc.y;

            if (field.inputType === 'textarea') {
                doc.font('Helvetica-Bold').text(labelText, 50, currentY, { width: 500 });
                doc.font('Helvetica').text(valueText, 50, currentY + 15, { width: 500 });
                doc.y = currentY + 15 + doc.heightOfString(valueText, { width: 500 }) + 10;
            } else {
                doc.text(labelText, 50, currentY, { width: 190 });
                doc.font('Helvetica-Bold').text(valueText, 250, currentY, { width: 140 });
                doc.font('Helvetica').text(refText, 400, currentY, { width: 150 });
                doc.y = currentY + rowHeight + 10;
            }
        });
    }

    // ==========================================
    // 5. SIGNATURES
    // ==========================================
    doc.moveDown(4);
    const scientistName = testRequest.verifiedBy ? `${testRequest.verifiedBy.firstName} ${testRequest.verifiedBy.lastName}` : 'Lab Scientist';
    doc.moveTo(50, doc.y).lineTo(200, doc.y).strokeColor('#000000').stroke();
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text(scientistName, 50, doc.y);
    doc.font('Helvetica-Oblique').fontSize(8).text('Verified By', 50, doc.y);
};

// --- ROUTES ---
const downloadTestReport = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template')
        .populate('enteredBy', 'firstName lastName')
        .populate('verifiedBy', 'firstName lastName');

    if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
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

const downloadPublicTestReport = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template')
        .populate('verifiedBy', 'firstName lastName');

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
    const { patientId, template } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    const templateDoc = await Template.findById(template);
    if (!templateDoc) {
        res.status(404);
        throw new Error("Test template not found");
    }

    const totalTests = await TestRequest.countDocuments(); 
    const labReference = `TURPOINT-${String(totalTests + 1).padStart(4, '0')}`;

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

    const testRequest = await TestRequest.create({
        patient: patient._id,
        template, 
        testPrice: templateDoc.price,       
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

const getTestByBarcode = asyncHandler(async (req, res) => {
    const { labReference } = req.params;

    const testRequest = await TestRequest.findOne({ labReference })
        .populate('patient', 'firstName lastName hospitalNumber gender age referringDoctor')
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

const enterTestResult = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { resultData } = req.body; 

    const testRequest = await TestRequest.findById(id);

    if (!testRequest) {
        res.status(404);
        throw new Error("Test request not found");
    }

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

const sendReportToPatient = asyncHandler(async (req, res) => {
    const testRequest = await TestRequest.findById(req.params.id)
        .populate('patient')
        .populate('template');

    if (!testRequest || (testRequest.status !== 'VERIFIED' && testRequest.status !== 'DELIVERED')) {
        res.status(400);
        throw new Error("Cannot send unverified reports. Please verify first.");
    }

    if (!testRequest.template) {
        res.status(400);
        throw new Error("Cannot send report: Test template structure is missing.");
    }

    let emailSent = false;

    if (testRequest.patient.email) {
        try {
            const pdfBuffer = await generatePDFBuffer(testRequest);
            const { sendEmail } = require("../services/notificationService");
            
            await sendEmail({
                send_to: testRequest.patient.email,
                name: `${testRequest.patient.firstName} ${testRequest.patient.lastName}`,
                subject: `Your Lab Results: ${testRequest.template.testName}`,
                sent_from: "Turning Point <no-reply@turningpoint.com>",
                reply_to: "support@turningpoint.com",
                template: "resultTemplate",
                attachments: [{ filename: `${testRequest.labReference}-Results.pdf`, content: pdfBuffer }]
            });
            emailSent = true;
        } catch (error) {
            console.error("Email dispatch failed:", error);
        }
    }

    testRequest.status = 'DELIVERED';
    await testRequest.save();

    res.status(200).json({
        success: true,
        message: emailSent ? "Email sent successfully." : "Marked as delivered (No email on file).",
        emailSent
    });
});

const getAllTestRequests = asyncHandler(async (req, res) => {
    const testRequests = await TestRequest.find()
        .populate('patient', 'firstName lastName hospitalNumber email phone referringDoctor')
        .populate('template', 'testName category')
        .sort('-createdAt'); 

    res.status(200).json({
        success: true,
        count: testRequests.length,
        data: testRequests
    });
});

const getPatientTestRequests = asyncHandler(async (req, res) => {
    const tests = await TestRequest.find({ patient: req.params.patientId })
        .populate('template', 'testName category')
        .sort('-createdAt');

    res.status(200).json({ success: true, count: tests.length, data: tests });
});

const trackTestPublic = asyncHandler(async (req, res) => {
    const test = await TestRequest.findOne({ labReference: req.params.labRef.toUpperCase() })
        .populate('template', 'testName');
    
    if (!test) {
        res.status(404);
        throw new Error("Invalid Lab Reference. Please check your receipt.");
    }

    res.status(200).json({
        success: true,
        data: {
            _id: test._id,
            labReference: test.labReference,
            status: test.status,
            testName: test.template?.testName || 'Unknown / Deleted Test',
            date: test.createdAt
        }
    });
});

module.exports = { 
    createTestRequest, getTestByBarcode, enterTestResult, 
    verifyTestResult, downloadTestReport, sendReportToPatient, getAllTestRequests, getPatientTestRequests, trackTestPublic, downloadPublicTestReport,
};