import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getAllOrder = async () => {
    try {
        const response = await axiosInstance.get(`/api/vendor/order/list`);
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}

// --------- working ---------
export const changeOrderStatus = async (id, data) => {
    // console.log(id, data);
    // console.log("---------------------------------");
    // return;
    try {
        const response = await axiosInstance.post(`/api/vendor/order/status/${id}`, data);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}