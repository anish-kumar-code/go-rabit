
const Driver = require("../../../models/driver");
const order = require("../../../models/order");
const OrderAssign = require("../../../models/orderAssign");
const catchAsync = require("../../../utils/catchAsync");

exports.assignedDriver = catchAsync(async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const { driverId } = req.body;
        if (!driverId) {
            return res.status(400).json({ success: false, message: "Chooese Driver" });
        }

        const Order = await order.findById(orderId);

        new OrderAssign({
            orderId: Order._id,
            driverId: driverId
        }).save();

        Order.assignedDriver = driverId;
        Order.orderStatus = "shipped";

        await Order.save();

        return res.status(200).json({ success: true, message: "Order Assigned", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});
