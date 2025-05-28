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
const { orderComplete } = require("../controllers/driver/orders/orderComplete");


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


//------------------------------------------------
// order
//------------------------------------------------
router.get("/orders", driverAuthenticate, orderList)
router.get("/order/:orderId", driverAuthenticate, orderDetails)
router.patch("/order/:orderId", driverAuthenticate, orderComplete)




module.exports = router;
