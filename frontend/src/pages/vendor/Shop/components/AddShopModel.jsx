import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, InputNumber, message, Select, Space, Row, Col } from 'antd';
import { ShopOutlined, UploadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { addShop } from '@services/vendor/apiShop';

const { Option } = Select;
const { TextArea } = Input;

const normFile = e => {
    // Antd upload event normalization
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

function AddShopModel({ isModalOpen, handleOk, handleCancel }) {
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            for (const key in values) {
                if (key === 'shopImage') {
                    formData.append('shopImage', values.shopImage[0].originFileObj);
                } else if (key === 'galleryImage') {
                    values.galleryImage.forEach(file => formData.append('galleryImage', file.originFileObj));
                } else if (key === 'menu') {
                    values.menu.forEach(file => formData.append('menu', file.originFileObj));
                } else {
                    formData.append(key, values[key]);
                }
            }

            // debug
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            setUploading(true);
            await addShop(formData);
            message.success('Shop added successfully!');
            form.resetFields();
            handleOk();
        } catch (error) {
            console.error('Error adding shop:', error);
            message.error('Failed to add shop. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                form.setFieldsValue({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                });
                message.success('Location fetched!');
            },
            () => {
                message.error('Unable to retrieve location.');
            }
        );
    };

    return (
        <Modal
            title="Add New Shop"
            open={isModalOpen}
            onOk={onSubmit}
            onCancel={handleCancel}
            okText="Add Shop"
            cancelText="Cancel"
            confirmLoading={uploading}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Shop Name"
                            rules={[{ required: true, message: 'Please enter shop name' }]}
                        >
                            <Input prefix={<ShopOutlined />} placeholder="Enter shop name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="shopImage"
                            label="Shop Image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Please upload a shop image' }]}
                        >
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload Shop Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="serviceId" label="Service Type" rules={[{ required: true }]}>
                            <Select placeholder="Select service">
                                <Option value="67ecc79120a93fc0b92a8b19">Food</Option>
                                <Option value="67ecc79a20a93fc0b92a8b1b">Grocery</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="shopType" label="Shop Type" rules={[{ required: true }]}>
                            <Select placeholder="Select shop type">
                                <Option value="veg">Veg</Option>
                                <Option value="nonveg">Nonveg</Option>
                                <Option value="both">Both</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                    <TextArea rows={2} placeholder="Enter address" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
                            <Input placeholder="Enter pincode" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Location (Lat, Long)">
                    <Space>
                        <Form.Item name="lat" rules={[{ required: true }]} noStyle>
                            <Input placeholder="Latitude" />
                        </Form.Item>
                        <Form.Item name="long" rules={[{ required: true }]} noStyle>
                            <Input placeholder="Longitude" />
                        </Form.Item>
                        <Button icon={<EnvironmentOutlined />} onClick={getLocation}>
                            Get Current Location
                        </Button>
                    </Space>
                </Form.Item>



                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="packingChargeOld"
                            label="Packing Charge"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={0} max={20} style={{ width: '100%' }}
                                onChange={(value) => {
                                    const gst = value * 0.18;
                                    form.setFieldsValue({
                                        packingChargegst: 18,
                                        packingCharge: Math.round(value + gst),
                                    });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="packingChargegst"
                            label="GST (%)"
                            initialValue={18}
                        >
                            <InputNumber readOnly variant='filled' style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="packingCharge"
                            label="Final Packing Charge"
                            rules={[{ required: true }]}
                        >
                            <InputNumber readOnly variant='filled' style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="galleryImage"
                            label="Gallery Images (multiple)"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true }]}
                        >
                            <Upload multiple beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Upload Gallery Images</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="menu"
                            label="Menu Images (multiple)"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true }]}
                        >
                            <Upload multiple beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Upload Menu Images</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default AddShopModel;
