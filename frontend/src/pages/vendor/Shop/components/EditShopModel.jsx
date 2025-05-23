import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, InputNumber, Select, Space, Row, Col, message } from "antd";
import { UploadOutlined, EnvironmentOutlined, ShopOutlined } from "@ant-design/icons";
import { getCurrentLocation } from "../../../../utils/getCurrentLocation";
import { updateShop } from "../../../../services/vendor/apiShop";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const { Option } = Select;
const { TextArea } = Input;

const normFile = e => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
};

const convertToFileList = (urls = []) =>
    urls.map((url, index) => ({
        uid: `${index}`,
        name: "image",
        status: "done",
        url: url?.startsWith("http") ? url : `${BASE_URL}/${url}`
    }));

const EditShopModel = ({ isModalOpen, handleOk, handleCancel, shopData }) => {
    const [form] = Form.useForm();
    const [locationLoading, setLocationLoading] = useState(false);

    useEffect(() => {
        if (shopData) {
            const formattedData = {
                ...shopData,
                serviceId: shopData?.serviceId?._id,
                shopImage: convertToFileList([shopData?.shopImage]),
                galleryImage: convertToFileList(shopData?.galleryImage),
                menu: convertToFileList(shopData?.menu)
            };
            form.setFieldsValue(formattedData);
        }
    }, [shopData]);

    const handleLocation = async () => {
        try {
            setLocationLoading(true);
            const coords = await getCurrentLocation();
            form.setFieldsValue({
                lat: coords.latitude,
                long: coords.longitude
            });
            message.success("Location fetched!");
        } catch (error) {
            message.error("Unable to get location");
        } finally {
            setLocationLoading(false);
        }
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            for (const key in values) {
                if (key === "shopImage") {
                    formData.append("shopImage", values.shopImage[0].originFileObj || values.shopImage[0]);
                } else if (key === "galleryImage" || key === "menu") {
                    values[key]?.forEach(file =>
                        formData.append(key, file.originFileObj || file)
                    );
                } else {
                    formData.append(key, values[key]);
                }
            }

            await updateShop(shopData._id, formData);
            message.success("Shop updated successfully!");
            form.resetFields();
            handleOk();
        } catch (error) {
            console.error("Update error:", error);
            message.error("Failed to update shop.");
        }
    };

    return (
        <Modal
            title="Edit Shop"
            open={isModalOpen}
            onOk={onSubmit}
            onCancel={handleCancel}
            okText="Update Shop"
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Shop Name"
                            rules={[{ required: true, message: "Please enter shop name" }]}
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
                            rules={[{ required: true, message: "Please upload a shop image" }]}
                        >
                            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
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
                        <Button icon={<EnvironmentOutlined />} onClick={handleLocation} loading={locationLoading} />
                    </Space>
                </Form.Item>

                <Form.Item name="packingCharge" label="Packing Charge" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="galleryImage"
                            label="Gallery Images"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true }]}
                        >
                            <Upload multiple beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />}>Upload Gallery Images</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="menu"
                            label="Menu Images"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true }]}
                        >
                            <Upload multiple beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />}>Upload Menu Images</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default EditShopModel;
