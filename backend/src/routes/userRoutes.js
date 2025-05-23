const express = require("express")
const { createAddeess } = require("../controllers/user/addressController/createAddress")
const sendOtp = require("../controllers/user/authController/sendOtp");
const { verifyOtp } = require("../controllers/user/authController/verifyOtp");
const { getProfile } = require("../controllers/user/authController/getProfile");
const { userAuthenticate } = require("../controllers/user/authController/userAuthenticate");
const updateProfile = require("../controllers/user/authController/updateProfile");
const fileUploader = require("../middleware/fileUploader");
const { changeUserType } = require("../controllers/user/authController/chnageUserType");
const { getAllCategory } = require("../controllers/user/homeController/getAllCategory");
const { getAllRecommendedProduct } = require("../controllers/user/homeController/getAllRecommendedProduct");
const { getAllFeaturedProduct } = require("../controllers/user/homeController/getAllFeaturedProduct");
const { getProductOfCategory } = require("../controllers/user/homeController/getProductOfCategory");
const { getShopOfCategory } = require("../controllers/user/homeController/getShopOfCategory");
const { getProductOfShop } = require("../controllers/user/homeController/getProductOfShop");
const { getProductDetail } = require("../controllers/user/homeController/getProductDetail");
const { createCart } = require("../controllers/user/cartController/createCart");
const { getCart } = require("../controllers/user/cartController/getCart");
const createOrder = require("../controllers/user/orderController/createOrder");
const getOrderDetail = require("../controllers/user/orderController/getOrderDetail");
const getAllOrder = require("../controllers/user/orderController/getAllOrder");
const { getAllBanners } = require("../controllers/user/bannerController/getBanner");
const { getCms } = require("../controllers/user/cmsController/getCms");
const { getHomeData } = require("../controllers/user/homeController/getHomeData");
const { getAddress } = require("../controllers/user/addressController/getAddress");
const { getAllToppins } = require("../controllers/user/toppinsController/getToppins");
const updateLatLong = require("../controllers/user/authController/updateLatLong");
const { getExplore } = require("../controllers/user/exploreController/getExploreController");
const { getHomeDataGrocery } = require("../controllers/user/homeController/getHomeDataGrocery");
const { getsubCategoryList } = require("../controllers/user/homeController/getsubCategoryList");
const { getsubCategoryProductList } = require("../controllers/user/homeController/getsubCategoryProductList");
const { getProductDetailOfGrocery } = require("../controllers/user/homeController/getProductDetailOfGrocery");
const router = express.Router()

// router.get("/test", (req,res)=>{
//     return res.status(200).json({message : "This is user test route"})
// })

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/profile', userAuthenticate, getProfile);
router.patch('/profile', userAuthenticate, fileUploader("user", [{ name: "image", maxCount: 1 }]), updateProfile);
router.patch('/location', userAuthenticate, updateLatLong);
router.post('/profile/type', userAuthenticate, changeUserType);


//------------------------------------------------
// Home Food Page
//------------------------------------------------
router.get('/home', userAuthenticate, getHomeData)
router.get('/homegrocery', userAuthenticate, getHomeDataGrocery)
router.get('/category/list', userAuthenticate, getAllCategory);
router.get('/product/list/recommended', userAuthenticate, getAllRecommendedProduct);
router.get('/product/list/featured', userAuthenticate, getAllFeaturedProduct);
router.get('/product/category/:categoryId/list', userAuthenticate, getProductOfCategory);
router.get('/product/:categoryId/shop', userAuthenticate, getShopOfCategory);
router.get('/product/shop/:shopId/list', userAuthenticate, getProductOfShop);
router.get('/product/productdetail/:productId', userAuthenticate, getProductDetail);
router.get('/product/productdetailgrocery/:productId', userAuthenticate, getProductDetailOfGrocery);
router.get("/subCategoryList/:categoryId", userAuthenticate, getsubCategoryList);
router.get("/getsubCategoryProductList/:subCategoryId", userAuthenticate, getsubCategoryProductList);


//------------------------------------------------
// banner
//------------------------------------------------
router.get("/banner/list", userAuthenticate, getAllBanners);


//------------------------------------------------
// explore
//------------------------------------------------
router.get("/explore/:exploreId", userAuthenticate, getExplore);



//------------------------------------------------
// toppins
//------------------------------------------------
router.get("/toppins", getAllToppins);


//------------------------------------------------
// cart
//------------------------------------------------
router.get("/cart", userAuthenticate, getCart)
router.post("/cart", userAuthenticate, createCart)


//------------------------------------------------
// address
//------------------------------------------------
router.get("/address", userAuthenticate, getAddress)
router.post("/address", userAuthenticate, createAddeess)



//------------------------------------------------
// order
//------------------------------------------------
router.get("/order", userAuthenticate, getAllOrder)
router.post("/order", userAuthenticate, createOrder)
router.get("/order/:orderId", userAuthenticate, getOrderDetail)


//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", userAuthenticate, getCms);


module.exports = router;