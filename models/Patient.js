
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    hospitalNumber: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true 
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Other'], 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true
    },
    phone: { type: String }
  },
  { timestamps: true }
);

// Virtual field to get full name easily on the backend
patientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// CRITICAL: We export the model directly, not wrapped in an object
module.exports = mongoose.model('Patient', patientSchema);