const mongoose = require('mongoose');

const walletRequestSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    amount_requested: Number,
    message: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    request_date: { type: Date, default: Date.now },
    admin_settled: Boolean, // true or false
}, {
    timestamps: true
});


const WalletRequest = mongoose.model('WalletRequest', walletRequestSchema);
module.exports = WalletRequest;