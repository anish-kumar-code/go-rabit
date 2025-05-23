const Order = require("../../../models/order");

const getAllOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderStatus } = req.query;

    // Base filter
    const filter = { userId };

    if (orderStatus === "active") {
      // anything that is NOT delivered or cancelled
      filter.orderStatus = { $nin: ["delivered", "cancelled"] };
    } else if (orderStatus === "completed") {
      // only delivered or cancelled
      filter.orderStatus = { $in: ["delivered", "cancelled"] };
    } else if (orderStatus !== "all") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }
    // if orderStatus === 'all', we leave filter as just { userId }

    const orders = await Order.find(filter)
      .populate("productData.product_id")       // Get product info
      .populate("couponId")                     // If a coupon was applied
      .populate("addressId")                    // Full address
      .populate("shopId", "name location packingCharge") // Shop info
      .populate("vendorId", "name email")       // Vendor info
      .sort({ createdAt: -1 });                 // Newest first

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getAllOrder;
