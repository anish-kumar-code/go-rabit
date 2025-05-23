const VendorProduct = require("../../../models/vendorProduct");
const Order = require("../../../models/order");

// let bookingCounter = 3; // Persist in DB in production

const createOrder = async (req, res) => {
    try {
        const {
            productData: prod,
            addressId,
            deliveryDate,
            deliveryTime,
            couponId = null,
            couponCode = "",
            couponAmount = 0,
        } = req.body;

        const userId = req.user._id;

        // Generate unique booking ID (e.g., ORD-001)
        const orderCount = await Order.countDocuments();
        const booking_id = `ORD-${String(orderCount + 1).padStart(3, '0')}`;

        // Fetch vendorProduct to derive shop and vendor
        const productDetails = await VendorProduct.findById(prod.product_id)
            .populate('shopId')
            .populate('vendorId');

        if (!productDetails || !productDetails.shopId || !productDetails.vendorId) {
            return res.status(400).json({ error: 'Invalid product/shop/vendor information' });
        }

        const shopId = productDetails.shopId._id;
        const vendorId = productDetails.vendorId._id;
        const packingCharge = productDetails.shopId.packingCharge || 0;
        const deliveryCharge = 10; // Can be dynamic

        // Commission calculation
        const commissionRate = productDetails.commissionRate || 0;
        const commissionAmount = (prod.price * prod.quantity * commissionRate) / 100;

        // Totals
        const prodTotal = prod.finalPrice;
        const afterCouponAmount = prodTotal - couponAmount;
        const finalTotalPrice = afterCouponAmount + deliveryCharge + packingCharge;

        // Build and save order document
        const order = new Order({
            booking_id,
            shopId,
            vendorId,
            productData: prod,
            itemTotal: prodTotal,
            couponId,
            couponCode,
            couponAmount,
            afterCouponAmount,
            userId,
            addressId,
            shopId,
            vendorId,
            deliveryDate,
            deliveryTime,
            deliveryCharge,
            packingCharge,
            commissionRate,
            commissionAmount,
            finalTotalPrice,
            orderStatus: 'pending',
            paymentMode: 'cash',
            paymentStatus: 'paid',
            paymentId: 'PAY123456',
        });

        await order.save();
        return res.status(201).json({ success: true, order });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = createOrder;
