import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getAllExplore = async () => {
    try {
        const response = await axiosInstance.get('/api/admin/explore')
        // console.log(response.data.data)
        return response.data;
    } catch (error) {
        console.log(error)
        message.error('Error fetching explore list');
    }
}

export const addExplore = async (formData) => {
    try {
        const response = await axiosInstance.post('/api/admin/explore', formData, { headers: { "Content-Type": "multipart/form-data" } });
        return response;
    } catch (error) {
        message.error('Error adding banner');
    }
}

export const updateExplore = async (id, formData) => {
    try {
        const response = await axiosInstance.patch(`/api/admin/explore/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return response;
    } catch (error) {
        message.error('Error adding banner');
    }
}

export const detailsExplore = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/explore/${id}`);
        return response.data;
    } catch (error) {
        message.error('Error adding banner');
    }
}

export const deleteExplore = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/admin/explore/${id}`);
        return response;
    } catch (error) {
        message.error('Error adding banner');
    }
}