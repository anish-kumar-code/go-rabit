const Shop = require("../../../models/shop");
const VendorProduct = require("../../../models/vendorProduct");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.getShop = catchAsync(async (req, res, next) => {

    const shops = await Shop.find().sort({"createdAt": -1}).populate('serviceId', 'name').populate('vendorId', 'name');
    if (!shops) return next(new AppError("No shop found.", 404));

    const shopsWithProductCounts = await Promise.all(
        shops.map(async (shop) => {
            const productCount = await VendorProduct.countDocuments({ shopId: shop._id });
            return {
                ...shop.toObject(),
                productCount,
                wallet: 0
            };
        })
    );

    return res.status(200).json({
        status: true,
        results: shops.length,
        data: shopsWithProductCounts
    })

})