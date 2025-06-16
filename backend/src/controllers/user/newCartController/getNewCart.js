const newCart = require("../../../models/newCart");

exports.getNewCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await newCart.findOne({ userId, status: "active" })
            .populate({
                path: "shops.shopId",
                select: "name address packingCharge lat long"
            })
            .populate({
                path: "shops.vendorId",
                select: "name"
            })
            .populate({
                path: "shops.items.productId",
                select: "name price primary_image"
            })
            .populate({
                path: "shops.items.toppings.toppingId",
                select: "name price"
            });

        if (!cart || cart.shops.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty", cart: null });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("GetCart Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
