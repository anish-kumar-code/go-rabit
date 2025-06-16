const express = require("express");
const { signup } = require("../controllers/admin/auth/signup");
const { login } = require("../controllers/admin/auth/login");
const { adminAuthenticate } = require("../controllers/admin/auth/adminAuthenticate");
const fileUploader = require("../middleware/fileUploader");
const { createSearchIndex } = require("../models/vendor");
const { createCategory } = require("../controllers/admin/categoryController/createCategory");
const { getVendor } = require("../controllers/admin/vendorController/getVendor");
const { getVendorDetails } = require("../controllers/admin/vendorController/getVendorDetails");
const { vendorBlock } = require("../controllers/admin/vendorController/vendorBlock");
const { vendorApprove } = require("../controllers/admin/vendorController/vendorApprove");
const { getCategory } = require("../controllers/admin/categoryController/getCategory");
const { updateCategoryStatus } = require("../controllers/admin/categoryController/updateCategoryStatus");
const { deleteCategory } = require("../controllers/admin/categoryController/deleteCategory");
const { updateCategory } = require("../controllers/admin/categoryController/updateCategory");
const { getSubCategory } = require("../controllers/admin/categoryController/getSubCategory");
const { getAllSubCategory } = require("../controllers/admin/categoryController/getAllSubCategory");
const { getAllProduct } = require("../controllers/admin/productController/getAllProduct");
const { getVendorProduct } = require("../controllers/admin/vendorController/getVendorProduct");
const { getProductDetail } = require("../controllers/admin/productController/getProductDetail");
const { updateProductStatus } = require("../controllers/admin/productController/updateProductStatus");
const { createProduct } = require("../controllers/admin/productController/createProduct");
const { getAllBrand } = require("../controllers/admin/brandController/getAllBrand");
const { getProductViaService } = require("../controllers/admin/productController/getProductViaService");
const { getSettings } = require("../controllers/admin/settingController/getSettings");
const { addSettings } = require("../controllers/admin/settingController/addSettings");
const { updateSettings } = require("../controllers/admin/settingController/updateSettings");
const { getAllShop } = require("../controllers/admin/vendorController/getAllShop");
const { getAllData } = require("../controllers/admin/dashboardController/getAllData");
const { getShop } = require("../controllers/admin/shopController/getShop");
const { createDriver } = require("../controllers/admin/driverController/createDriver");
const { getDriver } = require("../controllers/admin/driverController/showDriver");
const { deleteShop } = require("../controllers/admin/shopController/deleteShop");
const { deleteVendor } = require("../controllers/admin/vendorController/deleteVendor");
const { getWalletRequest } = require("../controllers/admin/walletController/getWalletRequest");
const { changeStatusWalletRequest } = require("../controllers/admin/walletController/changeStatusWalletRequest");
const { settleRequest } = require("../controllers/admin/walletController/settleRequest");
const getAllOrder = require("../controllers/admin/orderController/getAllOrder");
const { createBanner } = require("../controllers/admin/bannerController/createBanner");
const { getAllBanners } = require("../controllers/admin/bannerController/getBanner");
const { getAllUsers } = require("../controllers/admin/userController/getUser");
const { addCms } = require("../controllers/admin/cmsController/addCms");
const { updateCms } = require("../controllers/admin/cmsController/updateCms");
const { getCms } = require("../controllers/admin/cmsController/getCms");
const { addToppins } = require("../controllers/admin/toppinsController/createToppins");
const { getAllToppins } = require("../controllers/admin/toppinsController/getToppins");
const { updateToppins } = require("../controllers/admin/toppinsController/updateToppins");
const { deleteToppins } = require("../controllers/admin/toppinsController/deleteToppins");
const { createExplore } = require("../controllers/admin/exploreController/createExplore");
const { getAllExplore } = require("../controllers/admin/exploreController/getAllExplore");
const { updateExplore } = require("../controllers/admin/exploreController/updateExplore");
const { getExplore } = require("../controllers/admin/exploreController/getExplore");
const { deleteExplore } = require("../controllers/admin/exploreController/deleteExplore");
const { createExploreSection } = require("../controllers/admin/exploreSectionController/createExploreSection");
const { getAllSections } = require("../controllers/admin/exploreSectionController/getAllExploreSection");
const { getSection } = require("../controllers/admin/exploreSectionController/getExploreSection");
const { updateSection } = require("../controllers/admin/exploreSectionController/updateExploreSection");
const { deleteSection } = require("../controllers/admin/exploreSectionController/deleteExploreSection");
const { orderComplete } = require("../controllers/admin/orderController/orderComplete");
const { createCoupon } = require("../controllers/admin/couponController/createCoupon");
const { getAllCoupons } = require("../controllers/admin/couponController/getAllCoupon");
const { updateCoupon } = require("../controllers/admin/couponController/updateCoupon");
const { deleteCoupon } = require("../controllers/admin/couponController/deleteCoupon");
const { getOrder } = require("../controllers/admin/orderController/getOrder");
const { assignedDriver } = require("../controllers/admin/orderController/assignDriver");
const { getAllProductFlag } = require("../controllers/admin/productFlag/getAllProduct");
const { toggleProductFlag } = require("../controllers/admin/productFlag/toggleProductFlag");
const { deleteProduct } = require("../controllers/admin/productController/deleteProduct");
const { updateProduct } = require("../controllers/admin/productController/updateProduct");
const { getAllProductExplore } = require("../controllers/admin/exploreController/getAllProduct");
const { getExploreViaId } = require("../controllers/admin/exploreSectionController/getExploreViaId");
const { createStore199Product } = require("../controllers/admin/store199Controller/createStore199Product");
const { getAllProductFor199Assign } = require("../controllers/admin/store199Controller/getAllProductFor199Assign");
const { getAllProductOfStore199 } = require("../controllers/admin/store199Controller/getAllProductOfStore199");
const { deleteStore199Product } = require("../controllers/admin/store199Controller/deleteStore199Product");
const { createBulkStore199Product } = require("../controllers/admin/store199Controller/createBulkStore199Product");
const { deleteProductFromExploreSection } = require("../controllers/admin/exploreSectionController/deleteProductFromExploreSection");
const { getAllDriverForThisOrder } = require("../controllers/admin/orderController/getAllDriverForThisOrder");
const { toggleBlockStatus } = require("../controllers/admin/driverController/toggleBlockStatus");
const { assignProductToExploreSection } = require("../controllers/admin/exploreSectionController/assignProductToExploreSection");
const { settleVendorWallet } = require("../controllers/admin/walletController/settleVendorWallet");
const { settleDriverWallet } = require("../controllers/admin/walletController/settleDriverWallert");
const router = express.Router()

router.get("/test/admin", (req, res) => {
    res.status(200).json({ message: "Admin Route Working" });
})

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/signup', signup)
router.post('/login', login)
router.get("/dashboard", adminAuthenticate, getAllData)


//------------------------------------------------
// banner
//------------------------------------------------
router.post("/banner/create", adminAuthenticate, fileUploader("banners", [{ name: "image", maxCount: 1 }]), createBanner);
router.get("/banner/list", adminAuthenticate, getAllBanners);


//------------------------------------------------
// category
//------------------------------------------------
router.post('/category/create', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), createCategory)
router.get('/category/list', adminAuthenticate, getCategory)
router.patch('/category/:id', adminAuthenticate, updateCategoryStatus)
router.patch('/category/update/:id', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), updateCategory)
router.delete('/category/delete/:id', adminAuthenticate, deleteCategory)

router.get("/subcategory/list", adminAuthenticate, getAllSubCategory)
router.get("/subcategory/:id", adminAuthenticate, getSubCategory)

//------------------------------------------------
// product
//------------------------------------------------
router.post("/product/create", adminAuthenticate, fileUploader("product", [{ name: "primary_image", maxCount: 1 }, { name: "gallery_image", maxCount: 10 }]), createProduct);
router.get("/product/list", adminAuthenticate, getAllProduct)
router.get("/product/list/:id", adminAuthenticate, getProductViaService)
router.get("/product/:id", adminAuthenticate, getProductDetail)
router.patch("/product/:id", fileUploader("product", [{ name: "primary_image", maxCount: 1 }, { name: "gallery_image", maxCount: 10 }]), updateProduct);
router.patch('/product/:id/toggle-status', updateProductStatus);
router.delete("/product/:id", adminAuthenticate, deleteProduct);


//------------------------------------------------
// product flag
//------------------------------------------------
router.get("/product/flag/list", adminAuthenticate, getAllProductFlag)
router.post("/product/flag/toggle", adminAuthenticate, toggleProductFlag)


//------------------------------------------------
// brand
//------------------------------------------------
router.get("/brand/list", adminAuthenticate, getAllBrand)


//------------------------------------------------
// toppins
//------------------------------------------------
router.post("/toppins", addToppins);
router.get("/toppins", getAllToppins);
router.patch("/toppins/:id", updateToppins);
router.delete("/toppins/:id", deleteToppins);


//------------------------------------------------
// explore
//------------------------------------------------
router.post("/explore", fileUploader("banners", [{ name: "icon", maxCount: 1 }, { name: "banner", maxCount: 1 },]), createExplore);
router.get("/explore", getAllExplore);
router.get("/explore/:id", getExplore);
router.patch("/explore/:id", fileUploader("banners", [{ name: "icon", maxCount: 1 }, { name: "banner", maxCount: 1 },]), updateExplore);
router.delete("/explore/:id", deleteExplore);


//------------------------------------------------
// explore section
//------------------------------------------------
router.post("/exploresection", createExploreSection);
router.get("/exploresection", getAllSections);
router.get("/exploresection/products", getAllProductExplore);
router.get("/exploresection/:id", getSection);
router.get("/explore/:exploreId/section", getExploreViaId);
router.patch("/exploresection/:id", updateSection);
router.delete("/exploresection/:id", deleteSection);
router.post("/exploresection/product", deleteProductFromExploreSection);
router.post("/exploresection/assign/product", assignProductToExploreSection);

//------------------------------------------------
// store199 product
//------------------------------------------------
router.post("/store199/product", adminAuthenticate, createStore199Product)
router.get("/store199/product", adminAuthenticate, getAllProductOfStore199)
router.delete("/store199/product/:id", adminAuthenticate, deleteStore199Product)
router.get("/store199/product/all", adminAuthenticate, getAllProductFor199Assign)
router.post("/store199/product/bulk", adminAuthenticate, createBulkStore199Product)
// router.get("/copy/product/:id", vendorAuthenticate, getCopyProductDetail)
// router.patch("/copy/product/status/:id", vendorAuthenticate, updateCopyProductStatus)
// router.patch("/copy/product/update/:id", vendorAuthenticate, updateCopyProduct)


//------------------------------------------------
// vendor
//------------------------------------------------
router.get("/vendor/list", adminAuthenticate, getVendor)
router.get("/vendor/:id", adminAuthenticate, getVendorDetails)
router.patch("/vendor/block/:id", adminAuthenticate, vendorBlock)
router.patch("/vendor/approve/:id", adminAuthenticate, vendorApprove);
router.delete("/vendor/delete/:id", adminAuthenticate, deleteVendor);
router.get("/vendor/:id/product", adminAuthenticate, getVendorProduct)
router.get("/vendor/shop/list/:vendorId", adminAuthenticate, getAllShop)

//------------------------------------------------
// shop
//------------------------------------------------
router.get("/shop/list", adminAuthenticate, getShop)
router.delete("/shop/delete/:shopId", adminAuthenticate, deleteShop)


//------------------------------------------------
// driver
//------------------------------------------------
router.post("/driver/create", adminAuthenticate, fileUploader("driver", [{ name: "image", maxCount: 1 }]), createDriver);
router.get('/driver/list', adminAuthenticate, getDriver)
router.patch("/driver/block/:driverId", adminAuthenticate, toggleBlockStatus);


//------------------------------------------------
// user
//------------------------------------------------
router.get("/user/list", adminAuthenticate, getAllUsers)


//------------------------------------------------
// coupon
//------------------------------------------------
router.post("/coupon", adminAuthenticate, createCoupon)
router.get("/coupon", adminAuthenticate, getAllCoupons);
router.patch("/coupon/:id", adminAuthenticate, updateCoupon);
router.delete("/coupon/:id", adminAuthenticate, deleteCoupon);



//------------------------------------------------
// order
//------------------------------------------------
router.get("/order", adminAuthenticate, getAllOrder)
router.patch("/order/status/:orderId", adminAuthenticate, orderComplete)
// router.post("/order", userAuthenticate, createOrder)
router.get("/order/:orderId", adminAuthenticate, getOrder)
router.get("/order/:orderId/driverlist", adminAuthenticate, getAllDriverForThisOrder)

router.patch("/order/assign/:orderId", adminAuthenticate, assignedDriver)


//------------------------------------------------
// wallet
//------------------------------------------------

// router.get("/wallet", vendorAuthenticate, getVendorWallet)
// router.get("/shops/wallets", vendorAuthenticate, getAllShopWallet)
// router.get("/shop/:shopId/wallet/history", vendorAuthenticate, getShopWalletHistory);
// router.get("/wallet/history", vendorAuthenticate, getVendorWalletHistory)
// router.post("/admin/vendor/:vendorId/wallet/settle", adminAuthenticate, settleVendorWallet); this is for admin
// router.get("/wallet/settlements", vendorAuthenticate, getVendorWalletSettlements);


//------------------------------------------------
// wallet Request
//------------------------------------------------

// router.post("/wallet/request", adminAuthenticate, createWalletRequest)
router.get("/wallet/request", adminAuthenticate, getWalletRequest)
router.post("/wallet/request/status/:requestId", adminAuthenticate, changeStatusWalletRequest)
router.post("/wallet/request/settle/:requestId", adminAuthenticate, settleRequest);

router.post("/vendor/:vendorId/wallet/settle", adminAuthenticate, settleVendorWallet);
router.post("/driver/:driverId/wallet/settle", adminAuthenticate, settleDriverWallet);


//------------------------------------------------
// settings
//------------------------------------------------
router.post("/settings/add", fileUploader("logo", [{ name: "image", maxCount: 1 }]), addSettings)
router.patch("/settings/update/:id", fileUploader("logo", [{ name: "image", maxCount: 1 }]), updateSettings)
router.get("/settings", getSettings)


//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", getCms)
router.post("/cms", adminAuthenticate, addCms)
router.patch("/cms/:id", adminAuthenticate, updateCms)



module.exports = router;