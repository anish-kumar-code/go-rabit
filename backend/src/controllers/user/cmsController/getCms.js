const Setting = require("../../../models/settings");
const catchAsync = require("../../../utils/catchAsync");

exports.getCms = catchAsync(async (req, res) => {

    let privacyPolicy = "This is the privacy policy content.";
    let aboutUs = "This is the about us content.";
    let termsAndConditions = "This is the terms and conditions content.";
    let returnPolicy = "This is the return policy content.";

    data = {privacyPolicy, aboutUs, termsAndConditions, returnPolicy};

    return res.status(200).json({
        success: true,
        message: "cms fetched successfully.",
        data: data,
    });
});
