const banner = require("../../../models/banner");
const Category = require("../../../models/category");
const Explore = require("../../../models/explore");
const User = require("../../../models/user");
const VendorProduct = require("../../../models/vendorProduct");
const { calculateOffer } = require("../../../utils/calculateOffer");
const catchAsync = require("../../../utils/catchAsync");


const formatProduct = (prod) => ({
    _id: prod._id,
    shopName: prod.shopId?.name || "",
    primary_image: prod.primary_image,
    shortDescription: prod.shortDescription,
    price: prod.vendorSellingPrice,
    mrp: prod.mrp,
    offer: calculateOffer(prod.mrp, prod.vendorSellingPrice),
    distance: "3",
    time: "5"
});

exports.getHomeData = catchAsync(async (req, res) => {
    const serviceId = req.query.serviceId || "67ecc79120a93fc0b92a8b19";
    if (!serviceId) return res.status(400).json({ success: false, message: "Service ID is required" });

    const user = await User.findById(req.user._id);
    const typeFilter = user.userType === "veg" ? { type: "veg" } : {};
    const commonQuery = { status: "active", serviceId, ...typeFilter };

    const [banners, categories, explore, recommendedRaw, featuredRaw] = await Promise.all([
        banner.find({ serviceId }).select("image").sort({ createdAt: -1 }),
        Category.find({ cat_id: null, serviceId }).select("name image").limit(8).sort({ createdAt: -1 }),
        Explore.find().select("name icon"),
        VendorProduct.find({ ...commonQuery, isRecommended: true }).limit(10).populate("shopId", "name lat long"),
        VendorProduct.find({ ...commonQuery, isFeatured: true }).limit(10).populate("shopId", "name lat long"),
    ]);

    res.status(200).json({
        success: true,
        message: "Home data fetched successfully",
        data: {
            banners,
            categories,
            explore,
            recommendedProducts: recommendedRaw.map(formatProduct),
            featuredProducts: featuredRaw.map(formatProduct),
        },
    });
});
