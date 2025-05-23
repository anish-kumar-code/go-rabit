const Address = require("../../../models/address");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

const validateRequiredField = (field, fieldName) => {
    if (!field || !field.trim()) return new AppError(`${fieldName} is required.`, 400);
    return null;
};

exports.createAddeess = catchAsync(async (req, res, next) => {

    let { address1, address2, city, pincode, state } = req.body;
    
    const userId = req.user._id
    if (!userId) return next(new AppError("User not found", 404));

    const requiredFields = [
        { field: address1, name: "Address 1" },
        { field: city, name: "City" },
        { field: pincode, name: "Pincode" },
        { field: state, name: "State" }
    ];

    for (const { field, name } of requiredFields) {
        const error = validateRequiredField(field, name);
        if (error) return next(error);
    }

    let address = new Address({ userId, address1, address2, city, pincode, state })
    await address.save();

    return res.status(201).json({
        status: true,
        message: "Address added successfully",
        data: { address },
        newAddress: true,
    });

})