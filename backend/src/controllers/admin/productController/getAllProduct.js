const Product = require("../../../models/product")
const catchAsync = require("../../../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req, res) => {

    // 67ecc79120a93fc0b92a8b19 - food
    // 67ecc79a20a93fc0b92a8b1b - grocery
    let { type } = req.query;

    if (!type) {
        return res.status(400).json({
            status: false,
            message: "Type is required"
        })
    }

    let serviceId;

    if (type == 'food') {
        serviceId = "67ecc79120a93fc0b92a8b19";
    } else if (type == 'grocery') {
        serviceId = "67ecc79a20a93fc0b92a8b1b";
    }

    const allProduct = await Product.find({ serviceId }).sort({ createdAt: -1 }).populate(["categoryId", "brandId", "serviceId", "vendorId"]).populate({ path: "subCategoryId", model: "Category" })

    return res.status(200).json({
        status: true,
        results: allProduct.length,
        data: allProduct
    })

})