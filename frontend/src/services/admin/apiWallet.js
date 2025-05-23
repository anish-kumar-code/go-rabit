import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getWalletRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/admin/wallet/request");
        return response.data;
    } catch (error) {
        console.log(error.message)
        message.error('Something went wrong');
    }
}

export const changeWalletRequestStatus = async (data) => {
    const id = data.record._id;
    const status = data.status;
    try {
        const response = await axiosInstance.post(`/api/admin/wallet/request/status/${id}`, {status});
        return response.data;
    } catch (error) {
        console.log(error.message)
        message.error('Something went wrong');
    }
}

export const settleWalletRequest = async (record) => {
    const id = record._id;
    const amount = record.amount_requested;
    try {
        const response = await axiosInstance.post(`/api/admin/wallet/request/settle/${id}`, {amount});
        return response.data;
    } catch (error) {
        console.log(error.message)
        message.error('Something went wrong');
    }
}