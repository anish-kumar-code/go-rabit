import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getDashboard = async () => {
    try {
        const response = await axiosInstance.get(`/api/admin/dashboard`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching dashboard data');
    }
}