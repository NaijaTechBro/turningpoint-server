const asyncHandler = require("express-async-handler");
const Template = require("../models/Template");

// @desc    Get all active test templates
// @route   GET /api/v1/templates
// @access  Private (Receptionist, Admin, LabScientist)
const getTemplates = asyncHandler(async (req, res) => {
    // Fetch all active templates, sorting them alphabetically by name
    const templates = await Template.find({ isActive: true }).sort({ testName: 1 });

    res.status(200).json({
        success: true,
        count: templates.length,
        data: templates
    });
});

module.exports = { getTemplates };