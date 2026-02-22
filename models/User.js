const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
}, { timestamps: true });

// Compare entered password with hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    if (!this.passwordHash) return false;
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);