const Order = require("../../../models/order");
const catchAsync = require("../../../utils/catchAsync");

exports.changeOrderStatus = catchAsync(async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status, preparationTime } = req.body; // Accept prep time optionally when status is accepted or preparing

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Guard: If already marked ready, do not allow further changes
        if (order.orderStatus === "ready") {
            return res.status(400).json({ success: false, message: "Order is already marked ready and cannot be updated." });
        }

        // Handle logic based on status
        switch (status) {
            case "accepted":
                order.orderStatus = "accepted";
                if (preparationTime) {
                    order.preparationTime = preparationTime;
                    order.preparationStartedAt = new Date();
                }
                break;

            case "preparing":
                if (!order.preparationStartedAt) {
                    order.preparationStartedAt = new Date();
                }
                if (preparationTime) {
                    order.preparationTime = preparationTime;
                }
                order.orderStatus = "preparing";
                break;

            case "ready":
                if (order.orderStatus !== "preparing") {
                    return res.status(400).json({
                        success: false,
                        message: "Order must be in 'preparing' state to be marked as 'ready'."
                    });
                }
                order.orderStatus = "ready";
                order.readyAt = new Date();
                break;

            case "cancelled":
            case "shipped":
            case "out of delivery":
            case "delivered":
                order.orderStatus = status;
                break;

            default:
                return res.status(400).json({ success: false, message: "Invalid status update request." });
        }

        await order.save();
        return res.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});
