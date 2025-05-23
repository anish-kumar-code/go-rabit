import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, message, Upload, Row, Col, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { updateCategory } from '../../../../services/apiCategory';
import dataURLtoFile from '../../../../utils/fileConverter';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EditCategoryModel({ isModalOpen, handleOk, handleCancel, categoryData }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        if (categoryData) {
            form.setFieldsValue({
                categoryName: categoryData.name,
                type: categoryData.type,
                serviceId: categoryData.serviceId._id
            });
            setImageUrl(categoryData.image);
        }
    }, [categoryData, form]);

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
            form.setFieldsValue({ image: info.file });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmit = async (values) => {

        const formData = new FormData();
        formData.append("name", values.categoryName)
        formData.append("type", values.type)
        formData.append("serviceId", values.serviceId) 
        if (imageUrl && imageUrl !== categoryData.image && imageUrl.startsWith("data:")) {
            const file = dataURLtoFile(imageUrl, "category.png");
            formData.append("image", file);
        }

        setLoading(true);
        try {
            await updateCategory(categoryData._id, formData);
            message.success('Category updated successfully!');
            form.resetFields();
            handleOk();
        } catch (error) {
            message.error('Error updating category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Category"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Update Category"
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
                    <Input placeholder='Enter Category Name' />
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

                <Form.Item label="Category Image" name="image" valuePropName='file'>
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
                                src={imageUrl.startsWith('data:') ? imageUrl : `${BASE_URL}/${imageUrl}`}
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

export default EditCategoryModel
