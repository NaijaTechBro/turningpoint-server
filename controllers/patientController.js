const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient");
const { sendEmail } = require("../services/notificationService"); 

const registerPatient = asyncHandler(async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, email, phone } = req.body;

    const currentYear = new Date().getFullYear();

    // ==========================================
    // FIX: SMART AUTO-INCREMENT FOR HOSPITAL NO.
    // ==========================================
    // 1. Find the very last patient registered THIS YEAR by sorting backwards
    const lastPatient = await Patient.findOne({ 
        hospitalNumber: new RegExp(`^TPH-${currentYear}-`) 
    }).sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastPatient && lastPatient.hospitalNumber) {
        // Extract the last 4 digits (e.g., from "TPH-2026-0032" we get "0032")
        const parts = lastPatient.hospitalNumber.split('-');
        if (parts.length === 3) {
            const lastSeq = parseInt(parts[2], 10);
            if (!isNaN(lastSeq)) {
                nextNumber = lastSeq + 1; // Increment by 1 from the absolute highest number
            }
        }
    }

    // 2. Format with leading zeros (e.g., 0033)
    const hospitalNumber = `TPH-${currentYear}-${String(nextNumber).padStart(4, '0')}`;

    // ==========================================

    const patient = await Patient.create({
        hospitalNumber, firstName, lastName, dateOfBirth, gender, email, phone
    });

    // Fire the Welcome Email if they provided an email address
    if (email) {
        try {
            await sendEmail({
                send_to: email,
                name: `${firstName} ${lastName}`,
                subject: "Welcome to TurningPoint Health Services!",
                sent_from: "Turning Point <no-reply@turningpoint.com>", // Update with your actual email
                reply_to: "support@turningpoint.com",
                template: "welcomeTemplate", // Ensure you have welcomeTemplate.handlebars in your /emails folder
                link: "https://turningpoint.com/patient-portal" 
            });
            console.log(`✅ Welcome email sent successfully to ${email}`);
        } catch (err) {
            console.error("❌ Failed to send welcome email:", err.message);
            // We don't throw an error here because the patient was still registered successfully in the DB
        }
    }

    res.status(201).json({
        success: true,
        message: "Patient registered successfully",
        data: patient
    });
});

// @desc    Get all patients (Paginated)
// @route   GET /api/v1/patients
const getPatients = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
        .sort("-createdAt")
        .skip(skip)
        .limit(limit).lean();

    const total = await Patient.countDocuments();

    res.status(200).json({
        success: true,
        count: patients.length,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        },
        data: patients
    });
});

// @desc    Search patients
// @route   GET /api/v1/patients/search
const searchPatients = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const patients = await Patient.find({
        $or: [
            { firstName: { $regex: q, $options: 'i' } },
            { lastName: { $regex: q, $options: 'i' } },
            { hospitalNumber: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } }
        ]
    }).limit(10).lean();

    res.json({ success: true, data: patients });
});

// @desc    Get single patient details
// @route   GET /api/v1/patients/:id
const getPatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        res.status(404);
        throw new Error("Patient record not found");
    }

    res.status(200).json({
        success: true,
        data: patient
    });
});

// @desc    Update patient details
// @route   PUT /api/v1/patients/:id
const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        res.status(404);
        throw new Error("Patient record not found");
    }

    const updatedData = {
        firstName: req.body.firstName || patient.firstName,
        lastName: req.body.lastName || patient.lastName,
        gender: req.body.gender || patient.gender,
        
        // These can be cleared/empty now
        age: req.body.age !== undefined ? req.body.age : patient.age,
        email: req.body.email !== undefined ? req.body.email : patient.email,
        phone: req.body.phone !== undefined ? req.body.phone : patient.phone,
        referringDoctor: req.body.referringDoctor !== undefined ? req.body.referringDoctor : patient.referringDoctor,
        referringClinic: req.body.referringClinic !== undefined ? req.body.referringClinic : patient.referringClinic,
        dateReferred: req.body.dateReferred || patient.dateReferred // Fallback to existing if blank
    };

    // If dateReferred is passed as an empty string from the frontend, remove the field from the update payload
    if (updatedData.dateReferred === '') {
        delete updatedData.dateReferred;
        await Patient.updateOne({ _id: req.params.id }, { $unset: { dateReferred: 1 } });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Patient updated successfully",
        data: updatedPatient
    });
});

const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    // Logic to check if patient has active test orders before deleting
    await patient.deleteOne();
    res.status(200).json({ success: true, message: "Patient record deleted" });
});

module.exports = { 
    registerPatient, 
    getPatients, 
    searchPatients, 
    getPatientById, 
    updatePatient,
    deletePatient
};