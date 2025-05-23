import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, message, Upload, Select, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dataURLtoFile from '@utils/fileConverter';
import { getAllCategory, updateCategory } from '@services/apiCategory';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const { Option } = Select;

function EditSubCategoryModel({ isModalOpen, handleOk, handleCancel, categoryData }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categoryData) {
            form.setFieldsValue({
                categoryName: categoryData.cat_id._id,
                subcategoryName: categoryData.name
            });
            setImageUrl(categoryData.image);
        }
    }, [categoryData, form]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategory();
                setCategories(res)
            } catch (error) {
                message.error("Failed to load categories.");
            }
        }
        fetchCategories()
    }, [])

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
        formData.append("name", values.subcategoryName)
        formData.append("cat_id", values.categoryName)
        if (imageUrl && imageUrl !== categoryData.image && imageUrl.startsWith("data:")) {
            const file = dataURLtoFile(imageUrl, "category.png");
            formData.append("image", file);
        }
        setLoading(true);
        try {
            await updateCategory(categoryData._id, formData);
            form.resetFields();
            handleOk();
        } catch (error) {
            message.error('Failed to update sub category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Sub Category"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Update Sub Category"
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
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a category"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            option?.label?.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {categories.map(cat => (
                            <Option key={cat._id} value={cat._id} label={cat.name}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Avatar size="small" src={`${BASE_URL}/${cat.image}`} />
                                    <span>{cat.name} --- {cat.type} - {cat.serviceId.name} </span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Sub Category Name"
                    name="subcategoryName"
                    rules={[{ required: true, message: 'Please enter sub category name!' }]}
                >
                    <Input placeholder='Enter Sub Category Name' />
                </Form.Item>

                <Form.Item label="Sub Category Image" name="image">
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

export default EditSubCategoryModel
