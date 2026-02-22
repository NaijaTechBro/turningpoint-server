// import mongoose from 'mongoose';

// const templateSchema = new mongoose.Schema({
//   testCode: { type: String, required: true, unique: true }, // e.g., 'WIDAL', 'MP', 'FBC'
//   testName: { type: String, required: true }, // e.g., 'Widal Reaction'
//   category: { type: String, required: true }, // e.g., 'Microbiology', 'Hematology'
  
//   // The JSON configuration that drives the dynamic React UI
//   schemaDefinition: [
//     {
//       fieldName: { type: String, required: true }, // e.g., 'salmonellaTyphiO'
//       label: { type: String, required: true }, // e.g., 'Salmonella Typhi O'
//       inputType: { 
//         type: String, 
//         enum: ['text', 'number', 'select', 'grid'], 
//         required: true 
//       },
//       options: [{ type: String }], // Used if inputType is 'select' (e.g., ['Negative', '+', '++', '+++'])
//       unit: { type: String }, // e.g., 'mg/dL', 'cells/mcL'
//       referenceRange: { type: String } // e.g., '< 1/80'
//     }
//   ],
//   isActive: { type: Boolean, default: true }
// }, { timestamps: true });

// export default mongoose.model('Template', templateSchema);



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