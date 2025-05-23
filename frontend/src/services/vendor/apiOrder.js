import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getAllOrder = async () => {
    try {
        const response = await axiosInstance.get(`/api/vendor/order/list`);
        console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}