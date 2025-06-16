const WalletHistory = require("../../../models/walletHistory");
const Driver = require("../../../models/driver");

exports.settleDriverWallet = async (req, res) => {
    try {
        const { amount, remark } = req.body;
        const driverId = req.params.driverId;

        // Basic validation
        if (!driverId || !amount || isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid vendor ID or amount"
            });
        }

        const numericAmount = Number(amount);

        // Find vendor
        const driver = await Driver.findById(driverId);
        if (!driver) {
            return res.status(404).json({
                status: false,
                message: "Driver not found"
            });
        }

        if (driver.wallet_balance < numericAmount) {
            return res.status(400).json({
                status: false,
                message: "Insufficient balance in vendor wallet"
            });
        }

        // Deduct the amount from the vendor's wallet
        driver.wallet_balance -= numericAmount;
        await driver.save();

        // Record in wallet history
        await WalletHistory.create({
            driverId: driver._id,
            action: 'settlement',
            amount: numericAmount,
            balance_after_action: driver.wallet_balance,
            description: remark || 'Wallet settlement by admin',
        });

        return res.status(200).json({
            status: true,
            message: "Wallet settled successfully",
            wallet_balance: driver.wallet_balance
        });

    } catch (error) {
        console.error("Error settling driver wallet:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
