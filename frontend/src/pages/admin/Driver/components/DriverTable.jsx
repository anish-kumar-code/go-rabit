import { Avatar, Button, Space, Switch, Table, Tag } from 'antd';
import { FaEdit, FaTrash, FaUserTie } from 'react-icons/fa';
import { updateDriverStatus } from '../../../../services/admin/apiDrivers'; // You should implement this if needed
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DriverTable = ({ searchText, data, onEdit, onDelete, loading }) => {

    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { image, name }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
                    {/* {image || '?'} */}
                    {image ? <img src={`${BASE_URL}/${image}`} alt={name} /> : <FaUserTie />}
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
            title: 'Vehicle Type',
            key: 'vehicleType',
            align: "center",
            render: (_, record) => record?.vehicle?.type || '-'
        },
        {
            title: 'Vehicle Model',
            key: 'vehicleModel',
            align: "center",
            render: (_, record) => record?.vehicle?.model || '-'
        },
        {
            title: 'Registration No.',
            key: 'vehicleReg',
            align: "center",
            render: (_, record) => record?.vehicle?.registrationNumber || '-'
        },
        {
            title: 'License No.',
            key: 'licenseNumner',
            align: "center",
            render: (_, record) => record?.licenseNumber || '-'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Block',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            align: "center",
            render: (_, record) => (
                <Switch
                    defaultChecked={record?.isBlocked}
                    onChange={(checked) =>
                        updateDriverStatus(record._id, checked)
                    }
                />
            )
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     align: "right",
        //     render: (_, record) => (
        //         <Space size="small">
        //             <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>Edit</Button>
        //             <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}>Delete</Button>
        //         </Space>
        //     )
        // }
    ];

    const filteredData = data.filter((item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

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

export default DriverTable;
