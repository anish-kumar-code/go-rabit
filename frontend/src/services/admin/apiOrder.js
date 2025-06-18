import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getAllOrder = async () => {
    try {
        const response = await axiosInstance.get(`/api/admin/neworder?orderStatus=all`);
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}

export const getOrderDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/neworder/${id}`);
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}

export const getAllDrivers = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/neworder/${id}/driverlist`)
        // console.log(response.data.data)
        return response.data;
    } catch (error) {
        console.log(error)
        message.error('Error fetching category list');
    }
}

export const assignDriver = async (id, driverId) => {
    try {
        const response = await axiosInstance.patch(`/api/admin/neworder/assign/${id}`, { driverId });
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error(error.response.data.message || 'Error assigning order');
    }
}

// --------- working ---------
// export const changeOrderStatus = async (id, data) => {
//     // console.log(id, data);
//     // console.log("---------------------------------");
//     // return;
//     try {
//         const response = await axiosInstance.post(`/api/vendor/order/status/${id}`, data);
//         // console.log(response.data)
//         return response.data;
//     } catch (error) {
//         // console.log(error)
//         message.error('Error fetching order');
//     }
// }