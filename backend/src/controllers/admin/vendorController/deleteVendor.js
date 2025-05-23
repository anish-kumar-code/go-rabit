const Vendor = require("../../../models/vendor");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.deleteVendor = catchAsync(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) return next(new AppError("Vendor Id is required.", 404));

        const vendor = await Vendor.findById(id);
        if (!vendor) return next(new AppError("Vendor not found.", 404));

        await Vendor.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Vendor deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", status: "notsuccess", error: error.message });
    }
});