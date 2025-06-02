const Product = require("../../../models/product");
const Shop = require("../../../models/shop");
const store199Product = require("../../../models/store199Product");
const Vendor = require("../../../models/vendor");
const VendorProduct = require("../../../models/vendorProduct");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllProductOfStore199 = catchAsync(async (req, res, next) => {

    // let { type } = req.query;

    // if (!type) return res.status(400).json({ status: false, message: "Type is required" })

    // let serviceId;

    // if (type == 'food') {
    //     serviceId = "67ecc79120a93fc0b92a8b19";
    // } else if (type == 'grocery') {
    //     serviceId = "67ecc79a20a93fc0b92a8b1b";
    // }

    const allProduct = await store199Product.find({ status: "active" }).sort({ createdAt: -1 }).populate(["categoryId", "brandId", "vendorId"]).populate({ path: "subCategoryId", model: "Category" });
    if (allProduct.length == 0) {
        return res.status(200).json({
            status: "false",
            message: "No product found"
        });
    }

    // const allProduct = allProductRaw.map((prod) => {
    //     return {
    //         _id: prod._id,
    //         shopName: prod.shopId?.name || "",
    //         primary_image: prod.primary_image,
    //         shortDescription: prod.shortDescription,
    //         price: prod.vendorSellingPrice,
    //         mrp: prod.mrp,
    //         offer: ((prod.mrp - prod.vendorSellingPrice) / prod.mrp * 100).toFixed(2) + '%',
    //         distance: "3",
    //         time: "5"
    //     };
    // });

    return res.status(200).json({
        status: "true",
        results: allProduct.length,
        data: allProduct
    });
})