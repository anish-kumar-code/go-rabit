const Order = require("../../../models/order");
const catchAsync = require("../../../utils/catchAsync");

exports.todayOrder = catchAsync(async (req, res, next) => {
    try {
        const vendorId = req.vendor._id;
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

        const orders = await Order.find({ vendorId, createdAt: { $gte: startOfDay, $lte: endOfDay } })
            .populate("productData.product_id")
            .populate("couponId")
            .populate("addressId")
            .populate("shopId", "name location packingCharge")
            .populate("vendorId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});