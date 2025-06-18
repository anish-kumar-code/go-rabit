import React from 'react'
import AdminLayout from './layout/adminLayout'
import { Route, Routes } from 'react-router'
// landing page
import LandingPage from './pages/web/Home/Home'

// admin
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Banner from './pages/admin/Banner/Banner'
import Category from './pages/admin/Category/Category'
import SubCategory from './pages/admin/SubCategory/SubCategory'
import Vendor from './pages/admin/Vendor/Vendor'
import VendorDetails from './pages/admin/Vendor/components/VendorDetails'
import VendorProducts from './pages/admin/Vendor/components/VendorProducts'
import Shop from './pages/admin/Shop/Shop'
import User from './pages/admin/User/User'
import Settings from './pages/admin/Settings/Settings'
import FoodProduct from './pages/admin/Food-Product/FoodProduct'
import GroceryProduct from './pages/admin/Grocery-Product/GroceryProduct'
import Login from './pages/admin/Auth/Login'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import ProductDetails from './pages/admin/Products/ProductDetails'
import PaymentRequest from './pages/admin/Payment-Request/PaymentRequest'
import Profile from './pages/admin/Settings/components/Profile'
import Charges from './pages/admin/Settings/components/Charges'
import TermConditions from './pages/admin/Settings/components/Term&Conditions'
import PrivacyPolicyPage from './pages/admin/Settings/components/PrivacyPolicyPage'
import RefundPolicy from './pages/admin/Settings/components/RefundPolicy'
import AboutUs from './pages/admin/Settings/components/AboutUs'
import Order from './pages/admin/Order/Order'
import OrderDetails from './pages/admin/Order/components/OrderDetails'
import OrderDetailsPage from './pages/admin/Order/components/OrderDetailsPage'

// vendor
import Cms from './pages/web/Cms/Cms'
import VendorPrivateRoute from './components/VendorPrivateRoute';
import VendorLayout from './layout/vendorLayout'
import VendorLogin from './pages/vendor/auth/Login'
import VendorRegister from './pages/vendor/auth/Register'
import VendorDashboard from './pages/vendor/Dashboard/Dashboard'
import VendorShop from './pages/vendor/Shop/Shop'
import VendorSettings from './pages/vendor/Settings/Settings'
import VendorProfile from './pages/vendor/Profile/Profile'
import VendorAddShop from './pages/vendor/Shop/components/AddShop'
import AddProduct from './pages/vendor/Shop/AddProduct'
import AllProduct from './pages/vendor/Shop/AllProduct'
import ProductDetailsForVendor from './pages/vendor/Products/ProductDetails'
import VendorOrder from './pages/vendor/Order/Order'
import Wallet from './pages/vendor/wallet/Wallet'
import ShopWalletHistory from './pages/vendor/wallet/ShopWalletHistory'
import WalletHistory from './pages/vendor/wallet/WalletHistory'
import Coupon from './pages/admin/Coupon/Coupon'
import Driver from "./pages/admin/Driver/Driver"
import CouponVendor from './pages/vendor/Coupon/CouponVenor'
import ProductFlags from './pages/admin/ProductFlags/ProductFlags'
import Explore from './pages/admin/Explore/Explore'
import ExploreSection from './pages/admin/ExploreSection/ExploreSection'
import Store199 from './pages/admin/Store199/Store199'
import ExploreSectionTable from './pages/admin/Explore/components/ExploreSectionTable'
import AddVendorProduct from './pages/vendor/Shop/AddVendorProduct'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/cms/:page' element={<Cms />} />

        {/* admin route */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<AdminPrivateRoute> <AdminLayout /> </AdminPrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='banner' element={<Banner />} />
          <Route path='product' element={<FoodProduct />} />
          {/* <Route path='product/:serviceName' element={<FoodProduct />} /> */}
          {/* <Route path='grocery-product' element={<GroceryProduct />} /> */}
          <Route path='category' element={<Category />} />
          <Route path='sub-category' element={<SubCategory />} />
          <Route path='coupon' element={<Coupon />} />
          <Route path='driver' element={<Driver />} />
          <Route path='vendor' element={<Vendor />} />
          <Route path='vendor/:id' element={<VendorDetails />} />
          <Route path='vendor/shops/:id' element={<VendorProducts />} />
          <Route path='products/:produtSlug' element={<ProductDetails />} />
          <Route path='product-flags' element={<ProductFlags />} />
          {/* <Route path='store199' element={<Store199 />} /> */}
          <Route path='shop' element={<Shop />} />
          <Route path='order' element={<Order />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="request/:type" element={<PaymentRequest />} />
          {/* <Route path="request/driver" element={<PaymentRequest />} /> */}
          <Route path='explore' element={<Explore />} />
          <Route path='explore/:exploreId' element={<ExploreSectionTable />} />
          <Route path='explore-section' element={<ExploreSection />} />
          <Route path='user' element={<User />} />
          <Route path='settings' element={<Settings />} />
          <Route path='settings/profile' element={<Profile />} />
          <Route path='settings/charges' element={<Charges />} />
          <Route path='terms-and-conditions/:type' element={<TermConditions />} />
          <Route path='privacy-policy/:type' element={<PrivacyPolicyPage />} />
          <Route path='refund-policy/:type' element={<RefundPolicy />} />
          <Route path='about-us/:type' element={<AboutUs />} />
        </Route>

        {/* vendor route */}
        <Route path='/vendor/login' element={<VendorLogin />} />
        <Route path='/vendor/register' element={<VendorRegister />} />
        <Route path='/vendor/addShop' element={<VendorAddShop />} />
        <Route path='/vendor' element={<VendorPrivateRoute><VendorLayout /></VendorPrivateRoute>}>
          <Route index element={<VendorDashboard />} />
          <Route path='shop' element={<VendorShop />} />
          <Route path='shop/add/:shopId' element={<AddProduct />} />
          <Route path='shop/:shopId/add-product' element={<AddVendorProduct />} />
          <Route path='shop/:shopId' element={<AllProduct />} />
          <Route path='shop/:shopId/product/:productId' element={<ProductDetailsForVendor />} />
          <Route path='order' element={<VendorOrder />} />
          <Route path='wallet' element={<Wallet />} />
          <Route path='wallet/:shopId' element={<ShopWalletHistory />} />
          <Route path='wallet/history' element={<WalletHistory />} />
          <Route path='profile' element={<VendorProfile />} />
          {/* <Route path='settings' element={<VendorSettings />} /> */}
          <Route path='coupon' element={<CouponVendor />} />
        </Route>
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
