const { default: axios } = require("axios");
const Address = require("../../../models/address");
const Setting = require("../../../models/settings");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.createAddress = catchAsync(async (req, res, next) => {
    let { name, address1, address2, city, pincode, state, isDefault = true } = req.body;

    const userId = req.user._id;
    if (!userId) return next(new AppError("User not found", 404));
    if (!address1) return next(new AppError("Address 1 is required", 404));
    if (!city) return next(new AppError("City is required", 404));
    if (!pincode) return next(new AppError("Pincode is required", 404));
    if (!state) return next(new AppError("State is required", 404));

    const setting = await Setting.findById("680f1081aeb857eee4d456ab");
    const apiKey = setting?.googleMapApiKey || "working";
    const addressStr = `${address1}, ${address2 || ''}, ${city}, ${state}, ${pincode}`.replace(/\s+/g, ' ').trim();

    let location = null;
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressStr)}&key=${apiKey}`
        );
        if (response.data.status === "OK" && response.data.results[0]) {
            const { lat, lng } = response.data.results[0].geometry.location;
            location = {
                type: "Point",
                coordinates: [lng, lat] // ⚠️ GeoJSON format: [longitude, latitude]
            };
        }
    } catch (err) {
        console.error("Google Maps API error:", err);
    }

    // Get user's existing default address
    const defaultExists = await Address.exists({ userId, isDefault: true });

    // If `isDefault` is passed true, unset all other default addresses
    if (isDefault === true || (!defaultExists && isDefault !== false)) {
        await Address.updateMany({ userId }, { isDefault: false });
        isDefault = true;
    } else {
        isDefault = false;
    }

    const address = new Address({
        userId,
        name,
        address1,
        address2,
        city,
        pincode,
        state,
        location,
        isDefault
    });

    await address.save();

    return res.status(201).json({
        status: true,
        message: "Address added successfully",
        data: { address },
        newAddress: true,
    });
});


// exports.createAddress = catchAsync(async (req, res, next) => {

//     let { name, address1, address2, city, pincode, state } = req.body;

//     const userId = req.user._id
//     if (!userId) return next(new AppError("User not found", 404));
//     if (!address1) return next(new AppError("Address 1 is required", 404));
//     if (!city) return next(new AppError("City is required", 404));
//     if (!pincode) return next(new AppError("Pincode is required", 404));
//     if (!state) return next(new AppError("State is required", 404));

//     const setting = await Setting.findById("680f1081aeb857eee4d456ab");
//     const apiKey = setting?.googleMapApiKey || "working";
//     const addressStr = `${address1}, ${address2 || ''}, ${city}, ${state}, ${pincode}`.replace(/\s+/g, ' ').trim();

//     let location = null;
//     try {
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressStr)}&key=${apiKey}`
//         );
//         if (response.data.status === "OK" && response.data.results[0]) {
//             const { lat, lng } = response.data.results[0].geometry.location;
//             location = {
//                 type: "Point",
//                 coordinates: [lat, lng] // GeoJSON uses [latitude, longitude]
//             };
//         }
//     } catch (err) {
//         // Optional: Log error or handle gracefully
//         console.error("Google Maps API error:", err);
//     }

//     let address = new Address({ userId, name, address1, address2, city, pincode, state, location })
//     await address.save();

//     return res.status(201).json({
//         status: true,
//         message: "Address added successfully",
//         data: { address },
//         newAddress: true,
//     });

// })