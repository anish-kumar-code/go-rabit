const newOrder = require("../../../models/newOrder");
const catchAsync = require("../../../utils/catchAsync");

exports.getNewOrderDetails = catchAsync(async (req, res, next) => {
    try {
        const { orderId } = req.params;

        // Populate fields as per new schema key names
        const order = await newOrder.findById(orderId)
            .populate("productData.productId") // Note: productId instead of product_id
            .populate("productData.toppings.toppingId") // Populate toppings if needed
            .populate("userId", "name email")
            .populate("addressId")
            .populate("couponId")
            .populate("shopId", "name location packingCharge")
            .populate("assignedDriver", "name")
            .populate("vendorId", "name email");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // If you want to keep the response key names exactly the same,
        // you do NOT need to remap them, since your schema keys match your old API keys.
        // (e.g., productData, userId, shopId, etc.)

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});
