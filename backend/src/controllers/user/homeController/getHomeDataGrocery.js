const banner = require("../../../models/banner");
const Category = require("../../../models/category");
const Explore = require("../../../models/explore");
const User = require("../../../models/user");
const VendorProduct = require("../../../models/vendorProduct");
const { calculateOffer } = require("../../../utils/calculateOffer");
const catchAsync = require("../../../utils/catchAsync");


const formatProduct = (prod) => ({
    _id: prod._id,
    name: prod.name,
    shopId: prod.shopId._id || null,
    vendorId: prod.vendorId,
    primary_image: prod.primary_image,
    sellingUnit: prod.sellingUnit,
    mrp: prod.mrp,
    price: prod.vendorSellingPrice,
    offer: calculateOffer(prod.mrp, prod.vendorSellingPrice),
    shortDescription: prod.shortDescription,
});

exports.getHomeDataGrocery = catchAsync(async (req, res) => {
    const serviceId = req.query.serviceId || "67ecc79a20a93fc0b92a8b1b";
    const user = await User.findById(req.user._id);
    const typeFilter = user.userType === "veg" ? { type: "veg" } : {};

    const queryCommon = { status: "active", serviceId, ...typeFilter };

    const [banners, categories, explore, featuredRaw, seasonalRaw, vegRaw, fruitRaw, kitchenRaw] = await Promise.all([
        banner.find({ serviceId }).select("image").sort({ createdAt: -1 }),
        Category.find({ cat_id: null, serviceId }).select("name image").limit(8).sort({ createdAt: -1 }),
        Explore.find({ serviceId }).select("name icon"),
        VendorProduct.find({ ...queryCommon, isFeatured: true }).limit(10).populate("shopId", "name lat long"),
        VendorProduct.find({ ...queryCommon, isSeasonal: true }).limit(10).populate("shopId", "name lat long"),
        VendorProduct.find({ ...queryCommon, isVegetableOfTheDay: true }).limit(10).populate("shopId", "name lat long"),
        VendorProduct.find({ ...queryCommon, isFruitOfTheDay: true }).limit(10).populate("shopId", "name lat long"),
        VendorProduct.find({ categoryId: "6854ffe193a2cab5ddcba4cf" }).limit(5).populate("shopId", "name lat long"),
    ]);

    res.status(200).json({
        success: true,
        message: "Home data fetched successfully",
        data: {
            banners,
            categories,
            explore,
            featuredProducts: featuredRaw.map(formatProduct),
            seasonalProducts: seasonalRaw.map(formatProduct),
            vegetableslProducts: vegRaw.map(formatProduct),
            fruitsProducts: fruitRaw.map(formatProduct),
            kitchenProducts: kitchenRaw.map(formatProduct),
        },
    });
});
