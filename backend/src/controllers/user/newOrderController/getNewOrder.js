const newOrder = require("../../../models/newOrder");

exports.getNewOrder = async (req, res) => {
    try {
        // const orderStatus = req.query.orderStatus;
        const type = req.query.type;

        // Get start and end of today (local time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let filter = {};

        // if (orderStatus && orderStatus !== "all") {
        //     filter.orderStatus = orderStatus;
        // }

        if (type === "today") {
            filter.deliveryDate = { $gte: today, $lt: tomorrow };
        } else if (type === "previous") {
            filter.deliveryDate = { $lt: today };
        }

        let ordersRaw = await newOrder.find(filter)
            .populate("productData.productId")
            .populate("couponId")
            .populate("addressId")
            .populate("shopId", "name location packingCharge")
            .populate("vendorId", "name email")
            .populate("assignedDriver", "name")
            .sort({ createdAt: -1 });

        if (!ordersRaw || ordersRaw.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found'
            });
        }

        const orders = ordersRaw.map((order) => ({
            _id: order._id,
            booking_id: order.booking_id,
            deliveryDate: order.deliveryDate,
            deliveryTime: order.deliveryTime,
            finalTotalPrice: order.finalTotalPrice,
            orderStatus: order.orderStatus,
            paymentMode: order.paymentMode,
            paymentStatus: order.paymentStatus,
            shopName: order.shopId?.name,
            assignedDriver: order.assignedDriver ? order.assignedDriver.name : null,
        }));

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
