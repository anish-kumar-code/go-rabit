const Vendor = require("../../../models/vendor");
const WalletHistory = require("../../../models/walletHistory");
const WalletRequest = require("../../../models/walletRequest");
const catchAsync = require("../../../utils/catchAsync");

exports.settleRequest = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.requestId
        let { amount } = req.body

        // Find the wallet request by ID
        const walletRequest = await WalletRequest.findById(id);
        if (!walletRequest) return res.status(404).json({ message: "Wallet request not found", status: "notsuccess", });


        const { vendorId } = walletRequest;
        const vendor = await Vendor.findById(vendorId);
        if (!walletRequest) return res.status(404).json({ message: "Vendor not found", status: "notsuccess" });

        const walletBalance = vendor.wallet_balance;
        if (walletBalance < amount) return res.status(400).json({ message: "Insufficient wallet balance", status: "notsuccess" });

        // Update the vendor's wallet balance
        vendor.wallet_balance -= amount;
        await vendor.save();

        // Update the wallet request status to 'settled'
        walletRequest.admin_settled = true;
        await walletRequest.save();

        // Create a new wallet history entry
        const walletHistory = new WalletHistory({
            vendorId: vendor._id,
            action: "settlement",
            amount: amount,
            balance_after_action: vendor.wallet_balance,
            description: `Wallet request settled by admin.`,
        });
        await walletHistory.save();

        return res.status(200).json({
            message: "Wallet request settled successfully",
            status: "success",
            data: walletRequest,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            status: "notsuccess",
            error: error.message,
        });
    }
})