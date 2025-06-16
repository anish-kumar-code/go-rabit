import { Avatar, Badge, Button, Input, InputNumber, message, Modal, Space, Spin, Switch, Table, Tag, Tooltip } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { vendorApprove, vendorBlock } from '@services/apiVendor';
import { FaUserTie } from 'react-icons/fa6';
import { IoStorefront } from 'react-icons/io5';
import { useState } from 'react';
import { settleWallet } from '../../../../services/admin/apiWallet';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorTable = ({ data, searchText, onDelete, loading, onSettleSuccess }) => {
    const navigate = useNavigate();
    const [isSettleModalVisible, setIsSettleModalVisible] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [settleAmount, setSettleAmount] = useState(0);
    const [remarks, setRemarks] = useState('');

    const openSettleModal = (vendor) => {
        setSelectedVendor(vendor);
        setSettleAmount(vendor.wallet_balance);
        setRemarks('');
        setIsSettleModalVisible(true);
    };

    const handleSettle = async () => {
        if (settleAmount !== selectedVendor?.wallet_balance) {
            message.error("Settle total amount in single time");
            return;
        }

        const data = {
            amount: settleAmount,
            remark: remarks
        };

        try {
            await settleWallet(data, selectedVendor._id);
            message.success("Settlement done successfully");
            setIsSettleModalVisible(false);
            onSettleSuccess(selectedVendor._id); // Callback to update the table data
        } catch (error) {
            console.error("Something went wrong:", error);
            message.error("Failed to settle the wallet");
        }
    };

    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { profileImg, name }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
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
            title: 'Wallet',
            dataIndex: 'wallet',
            key: 'wallet',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tag>₹{record.wallet_balance || 0}</Tag>
                    <Tooltip title="Settle Amount">
                        <Button
                            type="default"
                            onClick={() => openSettleModal(record)}
                        >
                            Settle
                        </Button>
                    </Tooltip>
                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Shops">
                        <Badge count={record.shopCount} showZero size='small'>
                            <Button
                                type="primary"
                                icon={<IoStorefront />}
                                onClick={() => navigate(`/admin/vendor/shops/${record._id}`)}
                            />
                        </Badge>
                    </Tooltip>
                    <Tooltip title="Details">
                        <Button
                            type="primary"
                            icon={<IoMdEye />}
                            onClick={() => navigate(`/admin/vendor/${record._id}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="primary"
                            danger
                            icon={<FaTrash />}
                            onClick={() => onDelete(record)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const filteredData = data.filter(item =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="_id"
                scroll={{ x: true }}
                bordered={false}
                size='small'
                loading={loading}
            />

            <Modal
                title={`Settle Amount - ${selectedVendor?.name}`}
                open={isSettleModalVisible}
                onCancel={() => setIsSettleModalVisible(false)}
                onOk={handleSettle}
                okText="Settle"
            >
                <p><strong>Current Wallet:</strong> ₹{selectedVendor?.wallet_balance || 0}</p>
                <InputNumber
                    placeholder="Enter amount to settle"
                    value={settleAmount}
                    min={0}
                    onChange={setSettleAmount}
                    style={{ width: '100%', marginBottom: 10 }}
                />
                <Input.TextArea
                    placeholder="Remarks (optional)"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                />
            </Modal>
        </>
    );
};

export default VendorTable;
