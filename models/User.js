// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');

// const UserSchema = new mongoose.Schema({
//     email: { 
//         type: String, required: true, unique: true, lowercase: true, trim: true, index: true
//     },
//     passwordHash: { 
//         type: String, required: true, select: false 
//     },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     role: { 
//         type: String, 
//         enum: ['Admin', 'Receptionist', 'LabScientist'], 
//         default: 'Receptionist' 
//     },
//     status: { 
//         type: String, 
//         enum: ['active', 'inactive', 'suspended'], 
//         default: 'active' 
//     },
//     lastLogin: { type: Date },

//     resetPasswordToken: String,
//     resetPasswordExpire: Date,

// }, { timestamps: true });

// // Compare entered password with hashed password
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     if (!this.passwordHash) return false;
//     return await bcrypt.compare(enteredPassword, this.passwordHash);
// };

// module.exports = mongoose.model('User', UserSchema);



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Built into Node.js

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, required: true, unique: true, lowercase: true, trim: true, index: true
    },
    passwordHash: { 
        type: String, required: true, select: false 
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Receptionist', 'LabScientist'], 
        default: 'Receptionist' 
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive', 'suspended'], 
        default: 'active' 
    },
    lastLogin: { type: Date },
    
    // NEW: Fields for Password Resets
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

UserSchema.methods.matchPassword = async function(enteredPassword) {
    if (!this.passwordHash) return false;
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// NEW: Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken; 
};

module.exports = mongoose.model('User', UserSchema);