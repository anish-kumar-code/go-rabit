import { message } from "antd";
import axiosInstance from "@utils/axiosInstance"

export const getAllVendor = async () => {
    try {
        const response = await axiosInstance.get('/api/admin/vendor/list');
        // console.log(response.data.data.vendors)
        return response.data.data.vendors;
    } catch (error) {
        message.error('Error fetching vendor list');
    }
}

export const getVendorDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/vendor/${id}`);
        // console.log(response.data);
        return response.data.data
    } catch (error) {
        message.error('Error fetching vendor details');
    }
}

export const getVendorProduct = async(id)=>{
    try {
        const response = await axiosInstance.get(`/api/admin/vendor/${id}/product`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching vendor product');
    }
}

export const getVendorShop = async(id)=>{
    try {
        const response = await axiosInstance.get(`/api/admin/vendor/shop/list/${id}`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching vendor shops');
    }
}

export const vendorBlock = async (id, status) => {
    try {
        const response = await axiosInstance.patch(`/api/admin/vendor/block/${id}`, { status });
        message.success('vendor status update');
        return response;
    } catch (error) {
        message.error('vendor status not update');
    }
}

export const vendorApprove = async (id, status) => {
    try {
        const response = await axiosInstance.patch(`/api/admin/vendor/approve/${id}`, { status });
        message.success('vendor status update');
        return response;
    } catch (error) {
        message.error('vendor status not update');
    }
}

export const deleteVendor = async(vendorId)=>{
    console.log(vendorId)
    try {
        const response = await axiosInstance.delete(`/api/admin/vendor/delete/${vendorId}`);
        return response.data.data;
    } catch (error) {
        message.error('Error deleting vendor');
    }
}