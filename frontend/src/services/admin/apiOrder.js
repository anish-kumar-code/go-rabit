import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getAllOrder = async () => {
    try {
        const response = await axiosInstance.get(`/api/admin/order?orderStatus=all`);
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        // message.error('Error fetching order');
    }
}

export const getOrderDetails = async(id)=>{
    try {
        const response = await axiosInstance.get(`/api/admin/order/${id}`);
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching order');
    }
}

export const assignDriver = async(id, driverId)=>{
    try {
        const response = await axiosInstance.patch(`/api/admin/order/assign/${id}`, {driverId});
        // console.log(response)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error assigning order');
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