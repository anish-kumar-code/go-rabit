import { Avatar, Button, Space, Table } from 'antd';
import { FaEdit, FaTrash, FaUserTie } from 'react-icons/fa';
import { useMemo } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ExploreTable = ({ searchText = '', data = [], onEdit, onDelete, loading = false }) => {

    const columns = useMemo(() => [
        {
            title: 'Avatar',
            key: 'avatar',
            align: 'center',
            render: (_, { icon, name }) => (
                <Avatar size={40} src={icon ? `${BASE_URL}/${icon}` : undefined}>
                    {!icon && <FaUserTie />}
                </Avatar>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Coupon Code',
            dataIndex: 'couponCode',
            key: 'couponCode',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ], [onEdit, onDelete]);

    const filteredData = useMemo(() => {
        const text = searchText.toLowerCase();
        return data.filter(item => item?.name?.toLowerCase().includes(text));
    }, [data, searchText]);

    return (
        <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="_id"
            scroll={{ x: true }}
            bordered={false}
            size="small"
            loading={loading}
        />
    );
};

export default ExploreTable;
