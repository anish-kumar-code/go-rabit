import { Button, Select, Space, Table, Tag } from 'antd';
import { IoMdEye } from 'react-icons/io';
import { convertDate } from '../../../../utils/formatDate';
import { useState } from 'react';
import OrderDetailsModal from './OrderDetailsModal';

const OrderTable = ({ searchText, data, loading }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const statusOptions = ['Pending', 'Accept', 'Prepare', 'Ready'];

    const handleViewDetails = (record) => {
        setSelectedOrder(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleStatusChange = async (newStatus, orderId) => {
        console.log(newStatus, orderId)
        try {
            alert("working")
        } catch (error) {
            console.error(error);
            message.error('Failed to update status');
        }
    };

    const columns = [
        {
            title: 'Booking ID',
            dataIndex: 'booking_id',
            key: 'booking_id',
            align: 'center',
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            align: 'center',
            render: (date) => convertDate(date)
        },
        {
            title: 'Delivery Time',
            dataIndex: 'deliveryTime',
            key: 'deliveryTime',
            align: 'center'
        },
        {
            title: 'Total Amount',
            dataIndex: 'finalTotalPrice',
            key: 'finalTotalPrice',
            align: 'center',
            render: (amount) => `₹ ${amount}`,
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            align: 'center',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(value, record._id)}
                    options={statusOptions.map((status) => ({
                        label: status,
                        value: status,
                    }))}
                />
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            align: 'center',
            render: (status) => (
                <Tag
                    color={
                        status === 'Paid'
                            ? 'green'
                            : status === 'Pending'
                                ? 'orange'
                                : 'red'
                    }
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
            align: 'center',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => convertDate(date)
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<IoMdEye />}
                        onClick={() => handleViewDetails(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={data.filter((item) =>
                    item.booking_id.toLowerCase().includes(searchText.toLowerCase())
                )}
                loading={loading}
                columns={columns}
                rowKey="id"
                scroll={{ x: true }}
                bordered
                size="small"
            />

            <OrderDetailsModal selectedOrder={selectedOrder}
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose} />
        </>
    );
};

export default OrderTable;
