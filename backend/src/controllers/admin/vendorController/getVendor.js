const Vendor = require("../../../models/vendor");
const catchAsync = require("../../../utils/catchAsync");

exports.getVendor = catchAsync(async (req, res) => {

    // const vendors = await Vendor.find().sort({"createdAt": -1});
    const vendors = await Vendor.aggregate([
        {
            $lookup: {
                from: "shops", // collection name in MongoDB (case-sensitive)
                localField: "_id",
                foreignField: "vendorId",
                as: "shops"
            }
        },
        {
            $addFields: {
                shopCount: { $size: "$shops" }
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                shops: 0, // omit full shop data if not needed
                password: 0 // optional: exclude sensitive fields
            }
        }
    ]);


    return res.status(200).json({
        status: true,
        results: vendors.length,
        data: { vendors }
    })

})