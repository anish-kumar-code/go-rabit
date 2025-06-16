import React, { useEffect, useState } from 'react'
import { Avatar, Layout, Menu } from 'antd'
const { Sider } = Layout

import { useNavigate, useLocation } from 'react-router'

import { LuLayoutDashboard, LuUsers } from "react-icons/lu"
import { SiNextra } from "react-icons/si";
import { TbCategory2 } from 'react-icons/tb'
import { MdOutlineCategory } from 'react-icons/md'
import { FaClipboardList, FaRegUser, FaSitemap, FaUserClock } from 'react-icons/fa'
import { IoFastFoodOutline, IoImagesOutline, IoSettingsOutline, IoStorefront } from 'react-icons/io5'
import { GiTakeMyMoney } from "react-icons/gi";
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { RiCoupon3Line } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import { useAuth } from '../context/AuthContext'

const AdminSidebar = ({ collapsed, settingData }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Derive path segments after '/admin'
    const pathSnippets = location.pathname.split('/').slice(2)
    const openKey = pathSnippets.length > 1 ? pathSnippets[0] : ''
    const rawSelected = pathSnippets[pathSnippets.length - 1] || 'dashboard'

    // Build a unique selectedKey when inside a submenu
    const selectedKey = openKey ? `${openKey}-${rawSelected}` : rawSelected
    const [openKeys, setOpenKeys] = useState(openKey ? [openKey] : [])

    useEffect(() => {
        setOpenKeys(openKey ? [openKey] : [])
    }, [openKey])

    const { adminLogout } = useAuth();

    const menuItems = [
        { type: 'divider' },
        { key: 'dashboard', icon: <LuLayoutDashboard size={18} />, label: 'Dashboard', onClick: () => navigate('/admin') },
        { key: 'banner', icon: <IoImagesOutline size={18} />, label: 'Banner', onClick: () => navigate('/admin/banner') },
        { key: 'category', icon: <TbCategory2 size={18} />, label: 'Category', onClick: () => navigate('/admin/category') },
        { key: 'sub-category', icon: <MdOutlineCategory size={18} />, label: 'Sub Category', onClick: () => navigate('/admin/sub-category') },
        { key: 'product', icon: <IoFastFoodOutline size={18} />, label: 'Product', onClick: () => navigate('/admin/product') },
        { key: 'product-flags', icon: <IoFastFoodOutline size={18} />, label: 'Product Flag', onClick: () => navigate('/admin/product-flags') },
        // { key: 'store199', icon: <IoFastFoodOutline size={18} />, label: 'Store 199', onClick: () => navigate('/admin/store199') },
        { key: 'vendor', icon: <LuUsers size={18} />, label: 'Vendor', onClick: () => navigate('/admin/vendor') },
        { key: 'shop', icon: <IoStorefront size={18} />, label: 'Shop', onClick: () => navigate('/admin/shop') },
        { key: 'order', icon: <FaClipboardList size={18} />, label: 'Order', onClick: () => navigate('/admin/order') },
        { key: 'coupon', icon: <RiCoupon3Line size={18} />, label: 'Coupon', onClick: () => navigate('/admin/coupon') },
        { key: 'driver', icon: <RiEBike2Fill size={18} />, label: 'Driver', onClick: () => navigate('/admin/driver') },
        { key: 'explore', icon: <SiNextra size={18} />, label: 'Explore', onClick: () => navigate('/admin/explore') },


        // {
        //     key: 'explorea', icon: <SiNextra size={18} />, label: 'Explore', children: [
        //         { key: 'explore', label: 'Explore', onClick: () => navigate('/admin/explore') },
        //         { key: 'explore-section', label: 'Explore Section', onClick: () => navigate('/admin/explore-section') },
        //     ]
        // },

        {
            key: 'request', icon: <GiTakeMyMoney size={18} />, label: 'Payment Request', children: [
                { key: 'request-vendor', label: 'Vendor Request', onClick: () => navigate('/admin/request/vendor') },
                { key: 'request-driver', label: 'Driver Request', onClick: () => navigate('/admin/request/driver') }
            ]
        },
        { key: 'user', icon: <FaRegUser size={18} />, label: 'User', onClick: () => navigate('/admin/user') },
        {
            key: 'settings', icon: <IoSettingsOutline size={18} />, label: 'Settings', children: [
                // { key: 'settings-profile', label: 'Profile', onClick: () => navigate('/admin/settings/profile') },
                { key: 'settings-charges', icon: <FaSitemap />, label: 'Site', onClick: () => navigate('/admin/settings/charges') },
                {
                    key: 'vendor-cms', icon: <FaUserClock size={18} />, label: 'Vendor CMS', children: [
                        { key: 'vendor-terms-and-conditions', label: 'Terms & Conditions', onClick: () => navigate('/admin/terms-and-conditions/vendor') },
                        { key: 'vendor-privacy-policy', label: 'Privacy Policy', onClick: () => navigate('/admin/privacy-policy/vendor') },
                        { key: 'vendor-refund-policy', label: 'Refund Policy', onClick: () => navigate('/admin/refund-policy/vendor') },
                        { key: 'vendor-about-us', label: 'About Us', onClick: () => navigate('/admin/about-us/vendor') }
                    ]
                },
                {
                    key: 'user-cms', icon: <FaUserClock size={18} />, label: 'User CMS', children: [
                        { key: 'user-terms-and-conditions', label: 'Terms & Conditions', onClick: () => navigate('/admin/terms-and-conditions/user') },
                        { key: 'user-privacy-policy', label: 'Privacy Policy', onClick: () => navigate('/admin/privacy-policy/user') },
                        { key: 'user-refund-policy', label: 'Refund Policy', onClick: () => navigate('/admin/refund-policy/user') },
                        { key: 'user-about-us', label: 'About Us', onClick: () => navigate('/admin/about-us/user') }
                    ]
                },
            ]
        },
        { type: 'divider' },
        { key: 'logout', icon: <FaArrowRightToBracket size={18} />, label: 'Logout', onClick: () => { adminLogout(); navigate('/admin/login'); } }
    ]

    return (
        <Sider
            width={240}
            theme="light"
            collapsible
            collapsed={collapsed}
            trigger={null}
            className="shadow-md border-r"
            style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'auto' }}
        >
            <div className="flex items-center justify-center py-4">
                <Avatar size={collapsed ? 40 : 64} src={`${BASE_URL}/${settingData.logo}`} className="transition-all duration-300" />
                {!collapsed && <span className="ml-3 font-semibold text-2xl">{settingData.brandName}</span>}
            </div>

            <Menu
                mode="inline"
                theme="light"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={keys => setOpenKeys(keys)}
                items={menuItems}
                className="text-[15px] font-medium"
            />
        </Sider>
    )
}

export default AdminSidebar