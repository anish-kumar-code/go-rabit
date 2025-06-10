const express = require("express");
const router = express.Router();
const fileUploader = require("../middleware/fileUploader");
const { loginDriver } = require("../controllers/driver/auth/loginDriver");
const { registerDriver } = require("../controllers/driver/auth/registerDriver");
const { toggleStatus } = require("../controllers/driver/auth/toggleStatus");
const { updateProfile } = require("../controllers/driver/auth/updateProfile");
const { driverAuthenticate } = require("../controllers/driver/auth/driverAuth");
const { orderList } = require("../controllers/driver/orders/orderList");
const { orderDetails } = require("../controllers/driver/orders/orderDetails");
const { getProfile } = require("../controllers/driver/auth/getProfile");
const { orderStatusChange } = require("../controllers/driver/orders/orderStatusChange");
const { toggleBlockStatus } = require("../controllers/driver/auth/toggleBlockStatus");
const updateDriverLocation = require("../controllers/driver/auth/updateLocation");


//------------------------------------------------
// auth
//------------------------------------------------
// Register Driver
router.post("/register", fileUploader("driver", [
    { name: "image", maxCount: 1 },
    { name: "vehicleRcImage", maxCount: 1 },
    { name: "insuranceImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 }
]),
    registerDriver
);

// Login Driver
router.post("/login", loginDriver);

// Update Profile
router.patch("/profile", driverAuthenticate, fileUploader("driver", [
    { name: "image", maxCount: 1 },
    { name: "vehicleRcImage", maxCount: 1 },
    { name: "insuranceImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 }
]),
    updateProfile
);
router.get("/profile", driverAuthenticate, getProfile)

// Activate/Deactivate Driver
router.patch("/status/:driverId", toggleStatus);
// router.patch("/block/status/:driverId", toggleBlockStatus);
router.patch('/update-location/:driverId', updateDriverLocation);


//------------------------------------------------
// order
//------------------------------------------------
router.get("/orders", driverAuthenticate, orderList)
router.get("/order/:orderId", driverAuthenticate, orderDetails)
router.patch("/order/:orderId", driverAuthenticate, orderStatusChange)




module.exports = router;
