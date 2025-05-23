const Toppins = require("../../../models/toppins");
const catchAsync = require("../../../utils/catchAsync");

exports.createToppins = catchAsync(async (req, res, next) => {
    let { name, price } = req.body;

    if (!name || !name.trim()) return new AppError(`Name is required.`, 400);

    let toppins = new Toppins({ name, price });
    await toppins.save();

    return res.status(201).json({
        status: true,
        message: "Toppins added successfully",
        data: { toppins },
        newBrand: true,
    });

})