import { Avatar, Button, Space, Spin, Switch, Table } from 'antd'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAllCategory, updateStatus } from '@services/apiCategory';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CategoryTable = ({ searchText, data, onEdit, onDelete, loading }) => {

    const columns = [
        {
            title: 'Image',
            key: 'avatar',
            align: "center",
            render: (_, { image }) => (
                <Avatar size={60} style={{ backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    {image ? <img src={`${BASE_URL}/${image}`} /> : "?"}
                </Avatar>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'name',
            align: "center"
        },
        {
            title: 'Service',
            dataIndex: 'serviceId',
            key: 'name',
            align: "center",
            render: (_, record) => (<>{record.serviceId.name}</>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record?.status === "active"} onChange={(checked) => updateStatus(record._id, checked)} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>Edit</Button>
                    <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}>Delete</Button>
                </Space>
            )
        }
    ];

    const filtredData = data.filter((item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()))

    return <Table
        // dataSource={dataSource.filter(item => item.categoryName.toLowerCase().includes(searchText.toLowerCase()))}
        dataSource={filtredData}
        columns={columns}
        rowKey={"_id"}
        scroll={{ x: true }}
        bordered={false}
        size='small'
        loading={loading}
    />;
}

export default CategoryTable
