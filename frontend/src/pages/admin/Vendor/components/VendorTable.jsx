import { Avatar, Badge, Button, Space, Spin, Switch, Table, Tag } from 'antd'
import { FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { vendorApprove, vendorBlock } from '@services/apiVendor';
import { FaUserTie } from 'react-icons/fa6';
import { Tooltip } from 'antd';
import { IoStorefront } from 'react-icons/io5';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorTable = ({ data, searchText, onDelete, loading }) => {
    const navigate = useNavigate();


    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { profileImg, name }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
                    {/* {image || '?'} */}
                    {profileImg ? <img src={`${BASE_URL}/${profileImg}`} alt={name} /> : <FaUserTie />}
                </Avatar>
            )
        },
        {
            title: 'Owner Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: 'User Name',
            dataIndex: 'userId',
            key: 'userId',
            align: "center"
        },
        {
            title: 'Mobile no',
            dataIndex: 'mobile',
            key: 'mobile',
            align: "center"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center"
        },
        {
            title: 'Approve',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.status} onChange={(checked) => vendorApprove(record._id, checked)} />
            )
        },
        {
            title: 'Block',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.isBlocked} onChange={(checked) => vendorBlock(record._id, checked)} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Shops"><Badge count={record.shopCount} showZero size='small' ><Button type="primary" icon={<IoStorefront />} onClick={() => navigate(`/admin/vendor/shops/${record._id}`)}></Button></Badge></Tooltip>
                    <Tooltip title="Details"><Button type="primary" icon={<IoMdEye />} onClick={() => navigate(`/admin/vendor/${record._id}`)}></Button></Tooltip>
                    <Tooltip title="Delete"> <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)} /></Tooltip>
                </Space>
            )
        }
    ];

    const filtredData = data.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()))

    return <Table
        dataSource={filtredData}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }}
        bordered={false}
        size='small'
        loading={loading}
    />;
}

export default VendorTable
