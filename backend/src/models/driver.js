// models/Driver.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const driverSchema = new Schema({
    // --- Driver basic details ---
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, // URL or path to profile image
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    // --- Vehicle basic details ---
    vehicle: {
        type: {
            type: String,           // e.g. "Truck", "Van", "Car"
            required: true,
            trim: true
        },
        model: {
            type: String,           // e.g. "Ford F-150", "Mahindra Scorpio"
            required: true,
            trim: true
        },
        registrationNumber: {
            type: String,           // e.g. "KA05AB1234"
            required: true,
            unique: true,
            trim: true
        },
        licenseNumber: {
            type: String,           // Driver's DL number if you want
            trim: true
        }
    },

    // --- (Optional) Attach arbitrary documents ---
    documents: [
        {
            name: {               // e.g. "Registration Certificate"
                type: String,
                required: true,
                trim: true
            },
            fileUrl: {            // stored path/URL
                type: String,
                required: true
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
