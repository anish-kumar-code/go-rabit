const Product = require("../../../models/product");
const VendorProduct = require("../../../models/vendorProduct");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllProductFor199Assign = catchAsync(async (req, res, nex) => {
    let serviceId = "67ecc79a20a93fc0b92a8b1b"; // grocery serviceId
    const allProductRaw = await VendorProduct.find({ serviceId, status: "active" }).sort({ createdAt: -1 }).populate(["categoryId", "brandId", "serviceId", "vendorId"]).populate({ path: "subCategoryId", model: "Category" });

    const allProduct = allProductRaw.map((prod) => {
        return {
            _id: prod._id,
            name: prod.name,
            primary_image: prod.primary_image,
            price: prod.vendorSellingPrice,
            mrp: prod.mrp
        };
    });

    return res.status(200).json({
        status: "success",
        results: allProduct.length,
        data: allProduct
    });
})