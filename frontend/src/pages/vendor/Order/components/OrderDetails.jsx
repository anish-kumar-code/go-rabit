import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Select, Button, message, Card, Typography, Spin, Table } from 'antd';
import dataSource from '../data.json';

const { Option } = Select;
const { Title, Text } = Typography;

const deliveryBoys = [
  { id: '1', name: 'Abhishek' },
  { id: '2', name: 'Rohan' },
  { id: '3', name: 'Vikram' },
];

const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [loadingAssign, setLoadingAssign] = useState(false);

  useEffect(() => {
    const found = dataSource.find((o) => o.booking_id === id);
    if (found) {
      setOrderData(found);
      setAssignedTo(found.assignedTo || null);
    }
  }, [id]);

  if (!orderData) {
    return (
      <div className="flex justify-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  const handleAssign = () => {
    if (!selectedBoy) {
      return message.warning('Please select a delivery boy');
    }
    setLoadingAssign(true);
    setTimeout(() => {
      setAssignedTo(selectedBoy);
      message.success(`Order assigned to ${selectedBoy.name}`);
      setLoadingAssign(false);
    }, 1000);
  };

  const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', align: 'center' },
    { title: 'Price', dataIndex: 'price', key: 'price', align: 'center', render: (p) => `₹${p}` },
    { title: 'Total', key: 'total', align: 'center', render: (_, r) => `₹${r.quantity * r.price}` },
  ];

  return (
    <Card className="max-w-xl mx-auto my-4 shadow-md rounded-xl border p-6">
      <Title level={4}>Order ID: {orderData.booking_id}</Title>
      <Text className="block mb-2">Delivery Date: {orderData.delivery_date}</Text>
      <Text className="block mb-4">Delivery Time: {orderData.delivery_time}</Text>

      <Title level={5}>Items</Title>
      <Table dataSource={orderData.items} columns={columns} rowKey="id" pagination={false} bordered size="small" />

      <div className="my-4">
        <Title level={5}>Shop Details</Title>
        <Text>Shop Name: {orderData.shop.name}</Text><br />
        <Text>Address: {orderData.shop.address}</Text>
      </div>

      <div className="my-4">
        <Title level={5}>Vendor Details</Title>
        <Text>Vendor Name: {orderData.vendor.name}</Text><br />
        <Text>Phone: {orderData.vendor.phone}</Text>
      </div>

      <div className="my-4">
        <Title level={5}>Payment Details</Title>
        <Text>Method: {orderData.payment.method}</Text><br />
        <Text>Status: {orderData.payment.status}</Text><br />
        <Text>Total: ₹{orderData.payment.total}</Text><br />
        <Text>Transaction ID: {orderData.payment.txn_id}</Text>
      </div>

      {assignedTo ? (
        <div className="mb-4">
          <Text strong>Assigned To:</Text>
          <Text className="ml-2 text-green-600">{assignedTo.name}</Text>
        </div>
      ) : (
        <div className="mb-4">
          <Text type="danger">Not Assigned Yet</Text>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Select
          placeholder="Select Delivery Boy"
          style={{ width: 220 }}
          onChange={(val) => setSelectedBoy(deliveryBoys.find((b) => b.id === val))}
        >
          {deliveryBoys.map((boy) => (
            <Option key={boy.id} value={boy.id}>
              {boy.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleAssign} loading={loadingAssign}>
          Assign Order
        </Button>
      </div>
    </Card>
  );
};

export default OrderDetails;