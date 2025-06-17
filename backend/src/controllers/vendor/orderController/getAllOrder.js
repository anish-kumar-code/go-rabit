// const Order = require("../../../models/order");
const newOrder = require("../../../models/newOrder");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllOrder = catchAsync(async (req, res, next) => {
    try {
        const vendorId = req.vendor._id;

        const orders = await newOrder.find({ vendorId })
            .populate("productData.productId") // Correct field name
            .populate("productData.toppings.toppingId") // Populate toppings
            .populate("couponId") // If a coupon was applied
            .populate("addressId") // Full address
            .populate("shopId", "name location packingCharge") // Shop info
            .populate("vendorId", "name email") // Vendor info
            .sort({ createdAt: -1 }); // Newest first

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});



// exports.getAllOrder = catchAsync(async (req, res, next) => {
//     try {
//         const vendorId = req.vendor._id;

//         const orders = await Order.find({ vendorId })
//             .populate("productData.product_id") // Get product info
//             .populate("couponId") // If a coupon was applied
//             .populate("addressId") // Full address
//             .populate("shopId", "name location packingCharge") // Shop info
//             .populate("vendorId", "name email") // Vendor info
//             .sort({ createdAt: -1 }); // Newest first

//         return res.status(200).json({ success: true, orders });
//     } catch (error) {
//         console.error("Error fetching order details:", error);
//         return res.status(500).json({ success: false, message: "Server Error", error: error.message });
//     }
// });
