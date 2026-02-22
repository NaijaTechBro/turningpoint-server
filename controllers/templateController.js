// const asyncHandler = require("express-async-handler");
// const Template = require("../models/Template");

// // @desc    Get all active test templates
// // @route   GET /api/v1/templates
// // @access  Private (Receptionist, Admin, LabScientist)
// const getTemplates = asyncHandler(async (req, res) => {
//     // Fetch all active templates, sorting them alphabetically by name
//     const templates = await Template.find({ isActive: true }).sort({ testName: 1 });

//     res.status(200).json({
//         success: true,
//         count: templates.length,
//         data: templates
//     });
// });

// module.exports = { getTemplates };


const asyncHandler = require("express-async-handler");
const Template = require("../models/Template");

// @desc    Get all active test templates
// @route   GET /api/v1/templates (and /api/v1/templates/public)
// @access  Public / Private (Staff)
const getTemplates = asyncHandler(async (req, res) => {
    // Fetch all active templates, sorting them alphabetically by name
    const templates = await Template.find({ isActive: true }).sort({ testName: 1 });

    res.status(200).json({
        success: true,
        count: templates.length,
        data: templates
    });
});

// @desc    Create a new template
// @route   POST /api/v1/templates
// @access  Private (Admin Only)
const createTemplate = asyncHandler(async (req, res) => {
    // Optional: If you want to log who created it, you can add req.body.createdBy = req.user.id
    const template = await Template.create(req.body);
    
    res.status(201).json({ 
        success: true, 
        data: template 
    });
});

// @desc    Delete template
// @route   DELETE /api/v1/templates/:id
// @access  Private (Admin Only)
const deleteTemplate = asyncHandler(async (req, res) => {
    const template = await Template.findByIdAndDelete(req.params.id);
    
    if (!template) {
        res.status(404);
        throw new Error("Template not found");
    }
    
    res.status(200).json({ 
        success: true, 
        data: {} 
    });
});

// EXPORT ALL THREE FUNCTIONS!
module.exports = { 
    getTemplates, 
    createTemplate, 
    deleteTemplate 
};