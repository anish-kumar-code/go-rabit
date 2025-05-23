import { Avatar, Button, Space, Switch, Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateDriverStatus } from '../../../../services/admin/apiDrivers'; // You should implement this if needed
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DriverTable = ({ searchText, data, onEdit, onDelete, loading }) => {

    const columns = [
        {
            title: 'Image',
            key: 'avatar',
            align: "center",
            render: (_, { image, name }) => {
                const fixedImage = image?.replace("public\\", ""); // Windows path fix
                const imageUrl = `${BASE_URL}/${fixedImage}`;
                return (
                    <Avatar
                        size={60}
                        src={image ? imageUrl : null}
                        style={{
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {name?.charAt(0).toUpperCase()}
                    </Avatar>
                );
            }
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
            key: 'vehicleLicense',
            align: "center",
            render: (_, record) => record?.vehicle?.licenseNumber || '-'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch
                    defaultChecked={record?.status === "active"}
                    onChange={(checked) =>
                        updateDriverStatus(record._id, checked ? "active" : "inactive")
                    }
                />
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
