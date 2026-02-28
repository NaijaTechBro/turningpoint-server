const mongoose = require('mongoose');

const testRequestSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    
    // REPLACE testName WITH THIS:
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
    
    testPrice: { type: Number, required: true, default: 0 },
    labReference: { type: String, required: true, unique: true },
    barcodeImage: { type: String },
    status: { 
        type: String, 
        enum: ['PENDING', 'RESULT_ENTERED', 'VERIFIED', 'DELIVERED'], 
        default: 'PENDING' 
    },
    // The dynamic payload matching the Template's schemaDefinition
    resultData: { type: mongoose.Schema.Types.Mixed, default: {} },
    
    // Audit Trail
requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // ADD THIS
}, { timestamps: true });
module.exports = mongoose.model('TestRequest', testRequestSchema);