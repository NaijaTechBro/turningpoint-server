const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient");
// Import your awesome email service!
const { sendEmail } = require("../services/notificationService"); 

const registerPatient = asyncHandler(async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, email, phone } = req.body;

    const count = await Patient.countDocuments();
    const currentYear = new Date().getFullYear();
    const hospitalNumber = `TPD-${currentYear}-${String(count + 1).padStart(4, '0')}`;

    const patient = await Patient.create({
        hospitalNumber, firstName, lastName, dateOfBirth, gender, email, phone
    });

    // Fire the Welcome Email if they provided an email address
    if (email) {
        try {
            await sendEmail({
                send_to: email,
                name: `${firstName} ${lastName}`,
                subject: "Welcome to Turning Point Diagnostics",
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

module.exports = { registerPatient };