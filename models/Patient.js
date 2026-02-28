
// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema(
//   {
//     hospitalNumber: { 
//       type: String, 
//       required: true, 
//       unique: true, 
//       index: true 
//     },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },
//     gender: { 
//       type: String, 
//       enum: ['Male', 'Female', 'Other'], 
//       required: true 
//     },
//     email: { 
//       type: String, 
//       required: false, 
//       lowercase: true
//     },
//     phone: { type: String }
//   },
//   { timestamps: true }
// );

// // Virtual field to get full name easily on the backend
// patientSchema.virtual('fullName').get(function() {
//   return `${this.firstName} ${this.lastName}`;
// });

// // CRITICAL: We export the model directly, not wrapped in an object
// module.exports = mongoose.model('Patient', patientSchema);


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
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Other'], 
      required: true 
    },
    email: { 
      type: String, 
      lowercase: true
    },
    phone: { type: String },

    // --- NEW FIELDS ---
    referringDoctor: { type: String },
    referringClinic: { type: String },
    dateReferred: { type: Date },
    
    // Explicit registration date (Defaults to the exact moment they are saved)
    dateRegistered: { type: Date, default: Date.now },

    // OPTIONAL: Since we removed Date of Birth, you might still want an 'age' field 
    // because your PDF Lab Reports have an "AGE:" section at the top!
    age: { type: Number } 
  },
  { timestamps: true } // This automatically gives you 'createdAt' and 'updatedAt' too
);

// Virtual field to get full name easily on the backend
patientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// CRITICAL: We export the model directly, not wrapped in an object
module.exports = mongoose.model('Patient', patientSchema);