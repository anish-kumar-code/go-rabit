import React, { useState } from 'react'
import { Modal, Form, Input, message, Upload, Row, Col, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addCategory, getAllCategory } from '@services/apiCategory';
import dataURLtoFile from '@utils/fileConverter';

function AddCategoryModel({ isModalOpen, handleOk, handleCancel }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            return false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
            return false;
        }
        return false;
    };

    const handleChange = (info) => {
        if (info.file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(info.file);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmit = async (values) => {
        // console.log(values)

        if (!imageUrl) {
            return message.error("Please upload a category image.");
        }

        const file = dataURLtoFile(imageUrl, "category.png");
        const formData = new FormData();
        formData.append("name", values.categoryName);
        formData.append("type", values.type);
        formData.append("serviceId", values.serviceId);
        formData.append("image", file);
        try {
            setLoading(true);
            await addCategory(formData);
            message.success('Category added successfully!');
            form.resetFields();
            setImageUrl(null);
            handleOk();
            getAllCategory()
        } catch (error) {
            message.error("Failed to add category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add Category"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Add Category"
        >
            <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Category Name"
                    name="categoryName"
                    rules={[{ required: true, message: 'Please enter category name!' }]}
                >
                    <Input placeholder='Enter New Category Name' />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="type" label="Veg or Non veg" rules={[{ required: true }]}>
                            <Select placeholder="Select type">
                                <Option value="veg">Veg</Option>
                                <Option value="nonveg">Non Veg</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="serviceId" label="Food or Grocery" rules={[{ required: true }]}>
                            <Select placeholder="Select service">
                                <Option value="67ecc79120a93fc0b92a8b19">Food</Option>
                                <Option value="67ecc79a20a93fc0b92a8b1b">Grocery</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Category Image" name="image" >
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddCategoryModel
