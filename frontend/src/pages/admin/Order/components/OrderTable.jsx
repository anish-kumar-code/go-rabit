import { Button, Space, Table, Tag } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import dataSource from '../data.json'; 

const OrderTable = ({ searchText, onDelete }) => {
    const navigate = useNavigate();

    const transformedData = dataSource.map((item) => ({
        id: item.booking_id,
        booking_id: item.booking_id,
        delivery_date: new Date(item.delivery_date).toLocaleDateString(),
        delivery_time: item.delivery_time,
        total_amount: item.payment.total,
        order_status: item.status,
        payment_status: item.payment.status,
        payment_mode: item.payment.method,
        createdAt: new Date(item.createdAt).toLocaleString(),
        assignedTo: item.assignedTo || null,
    }));

    const handleViewDetails = (record) => {
        navigate(`/admin/order/${record.booking_id}`);
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
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            align: 'center',
        },
        {
            title: 'Delivery Time',
            dataIndex: 'delivery_time',
            key: 'delivery_time',
            align: 'center',
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            align: 'center',
            render: (amount) => `₹${amount}`,
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            key: 'order_status',
            align: 'center',
            render: (status) => (
                <Tag
                    color={
                        status === 'Delivered'
                            ? 'green'
                            : status === 'Confirmed'
                                ? 'blue'
                                : 'orange'
                    }
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
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
            dataIndex: 'payment_mode',
            key: 'payment_mode',
            align: 'center',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
            align: 'center',
            render: (assignedTo) =>
                assignedTo ? (
                    <Tag color="green">{assignedTo.name}</Tag>
                ) : (
                    <Tag color="red">Not Assigned</Tag>
                ),
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
                    <Button
                        type="primary"
                        danger
                        icon={<FaTrash />}
                        onClick={() => onDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={transformedData.filter((item) =>
                item.booking_id.toLowerCase().includes(searchText.toLowerCase())
            )}
            columns={columns}
            rowKey="id"
            scroll={{ x: true }}
            bordered
            size="small"
        />
    );
};

export default OrderTable;
