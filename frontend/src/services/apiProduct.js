import { message } from "antd";
import axiosInstance from "@utils/axiosInstance"

export const addProduct = async (formData) => {
    const response = await axiosInstance.post("/api/admin/product/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance(`/api/admin/product/list`);
        // const response = await axiosInstance(`/api/admin/product/list/${id}`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching product list');
    }
}

export const getProductDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/product/${id}`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching product details');
    }
}

export const updateProductStatus = async (id, status) => {
    status = status ? "active" : "inactive"
    try {
        const response = await axiosInstance.patch(`/api/admin/product/status/${id}`, { status });
        message.success('product status update');
        return response.data.data;
    } catch (error) {
        message.error('Error updating product status');
    }
}