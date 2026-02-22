

const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    testCode: { type: String, required: true, unique: true }, // e.g., 'WIDAL', 'MP'
    testName: { type: String, required: true }, // e.g., 'Widal Reaction'
    category: { type: String, required: true }, // e.g., 'Serology'
    
    // The JSON configuration that drives the dynamic React UI
    schemaDefinition: [
        {
            fieldName: { type: String, required: true }, 
            label: { type: String, required: true }, 
            inputType: { 
                type: String, 
                enum: ['text', 'number', 'select', 'grid'], 
                required: true 
            },
            options: [{ type: String }], // Used if inputType is 'select'
            unit: { type: String }, 
            referenceRange: { type: String } 
        }
    ],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// CRITICAL: Export the model directly
module.exports = mongoose.model('Template', templateSchema);