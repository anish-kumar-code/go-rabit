const Shop = require("../../../models/shop");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");

exports.updateShop = catchAsync(async (req, res, next) => {
    const shopId = req.params.id;
    const vendorId = req.vendor._id;

    const shop = await Shop.findOne({ _id: shopId, vendorId });
    if (!shop) return next(new AppError("Shop not found or unauthorized access.", 404));

    const { name, serviceId, shopType, address, pincode, lat, long, description, phone, rating, deliveryCharge, packingCharge } = req.body;

    const files = req.files;

    // Only update if new files are provided
    if (files.shopImage && files.shopImage[0]) {
        shop.shopImage = files.shopImage[0].path;
    }

    if (files.menu && files.menu.length > 0) {
        shop.menu = files.menu.map(file => file.path);
    }

    if (files.galleryImage && files.galleryImage.length > 0) {
        shop.galleryImage = files.galleryImage.map(file => file.path);
    }

    // Optional field updates
    if (name) shop.name = name;
    if (serviceId) shop.serviceId = serviceId;
    if (shopType) shop.shopType = shopType;
    if (address) shop.address = address;
    if (pincode) shop.pincode = pincode;
    if (lat) shop.lat = lat;
    if (long) shop.long = long;
    if (description) shop.description = description;
    if (phone) shop.phone = phone;
    if (rating) shop.rating = rating;
    if (deliveryCharge || deliveryCharge === 0) shop.deliveryCharge = deliveryCharge;
    if (packingCharge || packingCharge === 0) shop.packingCharge = packingCharge;

    await shop.save();

    return res.status(200).json({
        success: true,
        message: "Shop updated successfully",
        shop
    });
});
