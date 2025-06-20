const Driver = require("../../../models/driver");
const newOrder = require("../../../models/newOrder");
const order = require("../../../models/order");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.orderList = catchAsync(async (req, res, next) => {
    try {
        const driverId = req.driver._id;

        const type = req.query.type || "all";

        let filter = { assignedDriver: driverId };

        if (type == "history") {
            filter.orderStatus = "delivered";
        } else if (type == "new") {
            filter.orderStatus = "shipped";
        } else if (type == "ongoing") {
            filter.orderStatus = "running";
        }


        const orderListRaw = await newOrder.find(filter).sort({ createdAt: -1 }).populate("shopId", "name address image lat long").populate("addressId", "address1 address2 city pincode state").populate("userId", "name email mobileNo lat long").populate("productData.productId")
        if (!orderListRaw || orderListRaw.length === 0) {
            return next(new AppError("No orders found for this driver", 404));
        }

        const orderList = orderListRaw.map((ord) => {
            return {
                _id: ord._id,
                bookingId: ord.booking_id,
                orderId: ord.orderId,
                pickup: {
                    name: ord.shopId.name,
                    address: ord.shopId.address,
                    image: ord.shopId.image,
                    lat: ord.shopId.lat,
                    long: ord.shopId.long
                },
                delivery: {
                    image: ord.userId.profileImage || "",
                    name: ord.userId.name,
                    email: ord.userId.email,
                    mobileNo: ord.userId.mobileNo,
                    address1: ord.addressId.address1,
                    address2: ord.addressId.address2,
                    lat: ord.userId.lat,
                    long: ord.userId.long,
                    city: ord.addressId.city,
                    pincode: ord.addressId.pincode,
                    state: ord.addressId.state
                },
                products: ord.productData.map(prod => ({
                    name: prod.productId?.name || "product name",
                    price: prod.price,
                    quantity: prod.quantity,
                    finalPrice: prod.finalPrice,
                })),
                // products: {
                //     name: ord.productData.product_id.name,
                //     price: ord.productData.price,
                //     quantity: ord.productData.quantity,
                //     finialPrice: ord.productData.finalPrice,
                // },
                status: ord.orderStatus,
                deliveryCharge: ord.deliveryCharge,
                totalAmount: ord.finalTotalPrice,
                paymentMode: ord.paymentMode,
                createdAt: ord.createdAt
            };
        })

        res.status(200).json({
            success: true,
            message: "Order list retrieved successfully",
            count: orderList.length,
            orderList
        });
    } catch (error) {
        console.error("Error in order list:", error);
        return next(new AppError("Failed to get order list", 500));
    }
});
