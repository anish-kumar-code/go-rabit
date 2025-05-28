const Driver = require("../../../models/driver");
const order = require("../../../models/order");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.orderList = catchAsync(async (req, res, next) => {
    try {
        const driverId = req.driver._id;

        const orderListRaw = await order.find({assignedDriver: driverId}).populate("shopId", "name address image lat long").populate("addressId", "address1 address2 city pincode state").populate("userId", "name email mobileNo lat long")
        if (!orderListRaw || orderListRaw.length === 0) {
            return next(new AppError("No orders found for this driver", 404));
        }

        const orderList = orderListRaw.map((ord)=>{
            return {
                _id: ord._id,
                orderId: ord.orderId,
                pickup: {
                    name: ord.shopId.name,
                    address: ord.shopId.address,
                    image: ord.shopId.image,
                    lat: ord.shopId.lat,
                    long: ord.shopId.long
                },
                delivery: {
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
                status: ord.orderStatus,
                totalAmount: ord.finalTotalPrice,
                createdAt: ord.createdAt
            };
        }) 

        res.status(200).json({
            success: true,
            message: "Order list retrieved successfully",
            orderList
        });
    } catch (error) {
        console.error("Error in order list:", error);
        return next(new AppError("Failed to get order list", 500));
    }
});
