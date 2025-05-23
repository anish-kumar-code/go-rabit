// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Input, InputNumber, Select, Upload, Button, Radio } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const { Option } = Select;

// // Mock data - same as Add modal
// const categories = [{ id: 'cat1', name: 'Appetizers' }, { id: 'cat2', name: 'Main Course' }];
// const subCategories = {
//     cat1: [{ id: 'sub1', name: 'Soups' }, { id: 'sub2', name: 'Salads' }],
//     cat2: [{ id: 'sub3', name: 'Chicken Dishes' }, { id: 'sub4', name: 'Vegetarian Dishes' }],
// };
// const vendors = [{ id: 'ven1', name: 'Restaurant A' }, { id: 'ven2', name: 'Restaurant B' }];


// function EditFoodProductModal({ isModalOpen, handleOk, handleCancel, productData }) {
//     const [form] = Form.useForm();
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [fileList, setFileList] = useState([]);

//     // Pre-fill form when productData is available and modal opens
//     useEffect(() => {
//         if (productData && isModalOpen) {
//             form.setFieldsValue({
//                 name: productData.name,
//                 description: productData.description,
//                 vendor: productData.vendor?.id, // Assuming vendor is an object with id
//                 category: productData.category?.id, // Assuming category is an object with id
//                 subCategory: productData.subCategory?.id, // Assuming subCategory is an object with id
//                 price: productData.price,
//                 offerPrice: productData.offerPrice,
//                 stock: productData.stock,
//                 dietaryPreference: productData.dietaryPreference,
//             });
//             setSelectedCategory(productData.category?.id);

//             // Handle existing images - adapt based on how images are stored in productData
//             const existingImages = productData.images?.map((img, index) => ({
//                 uid: img.id || `-existing-${index}`, // Need a unique ID
//                 name: img.name || `image-${index}.png`, // Need a file name
//                 status: 'done',
//                 url: img.url, // URL of the existing image
//             })) || [];
//             setFileList(existingImages);

//         } else if (!isModalOpen) {
//             form.resetFields(); // Reset form when modal closes
//             setFileList([]);
//             setSelectedCategory(null);
//         }
//     }, [productData, isModalOpen, form]);

//     const onFinish = (values) => {
//         const updatedProductData = {
//             ...productData, // Keep existing ID and other fields
//             ...values, // Override with new form values
//             images: fileList // Include potentially updated image list
//         };
//         console.log('Updated product data: ', updatedProductData);
//         // Here you would typically make an API call to update the product
//         handleOk(); // Close the modal on success
//     };

//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         form.setFieldsValue({ subCategory: undefined });
//     };

//     const normFile = (e) => {
//         if (Array.isArray(e)) {
//             return e;
//         }
//         setFileList(e?.fileList);
//         return e?.fileList;
//     };

//     const handleRemove = file => {
//         // If removing an existing file already uploaded (identified by having a URL)
//         // you might need to make an API call here to delete it from the server.
//         console.log("Removing file:", file);
//         setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
//         return true; // Confirm removal from the list
//     };

//     return (
//         <Modal
//             title={`Edit Food Product: ${productData?.name || ''}`}
//             open={isModalOpen}
//             onOk={() => form.submit()} // Trigger form submission
//             onCancel={handleCancel}
//             okText="Save Changes"
//             cancelText="Cancel"
//             width={800}
//         >
//             <Form
//                 form={form}
//                 layout="vertical"
//                 name="edit_food_product_form"
//                 onFinish={onFinish}
//             >
//                 {/* Form items are largely the same as Add modal, but data is pre-filled */}
//                 <Form.Item
//                     name="name"
//                     label="Product Name"
//                     rules={[{ required: true, message: 'Please input the product name!' }]}
//                 >
//                     <Input placeholder="Enter product name" />
//                 </Form.Item>

//                 <Form.Item
//                     name="description"
//                     label="Description"
//                     rules={[{ required: true, message: 'Please enter a description!' }]}
//                 >
//                     <Input.TextArea rows={4} placeholder="Product description" />
//                 </Form.Item>

//                 <Form.Item name="vendor" label="Vendor" rules={[{ required: true, message: 'Please select a vendor!' }]}>
//                     <Select placeholder="Select a vendor">
//                         {vendors.map(vendor => (
//                             <Option key={vendor.id} value={vendor.id}>{vendor.name}</Option>
//                         ))}
//                     </Select>
//                 </Form.Item>

//                 <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
//                     <Select placeholder="Select a category" onChange={handleCategoryChange}>
//                         {categories.map(category => (
//                             <Option key={category.id} value={category.id}>{category.name}</Option>
//                         ))}
//                     </Select>
//                 </Form.Item>

//                 <Form.Item name="subCategory" label="Sub-Category" rules={[{ required: true, message: 'Please select a sub-category!' }]}>
//                     <Select placeholder="Select a sub-category" disabled={!selectedCategory}>
//                         {selectedCategory && subCategories[selectedCategory]?.map(sub => (
//                             <Option key={sub.id} value={sub.id}>{sub.name}</Option>
//                         ))}
//                     </Select>
//                 </Form.Item>

//                 <Form.Item name="price" label="Price (₹)" rules={[{ required: true, message: 'Please enter the price!' }]}>
//                     <InputNumber min={0} style={{ width: '100%' }} formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/₹\s?|(,*)/g, '')} />
//                 </Form.Item>

//                 <Form.Item name="offerPrice" label="Offer Price (₹) (Optional)">
//                     <InputNumber min={0} style={{ width: '100%' }} formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/₹\s?|(,*)/g, '')} />
//                 </Form.Item>

//                 <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true, message: 'Please enter stock quantity!' }]}>
//                     <InputNumber min={0} style={{ width: '100%' }} />
//                 </Form.Item>

//                 <Form.Item
//                     name="dietaryPreference"
//                     label="Dietary Preference"
//                     rules={[{ required: true, message: 'Please select dietary preference!' }]}
//                 >
//                     <Radio.Group>
//                         <Radio value="veg">Veg</Radio>
//                         <Radio value="non-veg">Non-Veg</Radio>
//                     </Radio.Group>
//                 </Form.Item>

//                 <Form.Item
//                     name="images"
//                     label="Product Images"
//                     valuePropName="fileList"
//                     getValueFromEvent={normFile}
//                 // Not marking as required for edit, assuming images might already exist
//                 >
//                     <Upload
//                         action="/upload.do" // Replace with your upload endpoint
//                         listType="picture"
//                         fileList={fileList}
//                         onRemove={handleRemove}
//                         beforeUpload={() => false} // Handle upload manually
//                         multiple
//                     >
//                         <Button icon={<UploadOutlined />}>Upload New / Replace</Button>
//                     </Upload>
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// }

// export default EditFoodProductModal;


import React, { useState, useEffect } from 'react';
import {
    Modal, Form, Input, InputNumber, Select, Upload,
    Row, Col, Avatar, message
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function EditFoodProductModal({ isModalOpen, handleOk, handleCancel, productData, data }) {
    const [form] = Form.useForm();
    const { categories, subCategories } = data;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [primaryImageList, setPrimaryImageList] = useState([]);
    const [galleryImageList, setGalleryImageList] = useState([]);

    useEffect(() => {
        if (productData && isModalOpen) {
            form.setFieldsValue({
                name: productData.name,
                sku: productData.sku,
                mrp: productData.mrp,
                sellingPrice: productData.sellingPrice,
                discount: productData.discount || 0,
                unitOfMeasurement: productData.unitOfMeasurement,
                sellingUnit: productData.sellingUnit,
                serviceId: productData.serviceId,
                type: productData.type,
                category: productData.category?._id,
                subCategory: productData.subCategory?._id,
                shortDescription: productData.shortDescription,
                longDescription: productData.longDescription,
            });

            setSelectedCategory(productData.category?._id);

            // Preload primary image
            if (productData.primary_image) {
                setPrimaryImageList([{
                    uid: 'primary-1',
                    name: 'Primary Image',
                    status: 'done',
                    url: productData.primary_image,
                }]);
            }

            // Preload gallery images
            const gallery = productData.gallery_image || [];
            setGalleryImageList(gallery.map((img, i) => ({
                uid: `gallery-${i}`,
                name: `gallery-${i}.png`,
                status: 'done',
                url: img,
            })));

            const subCats = subCategories.filter(sub => sub.cat_id?._id === productData.category?._id);
            setFilteredSubCategories(subCats);
        } else {
            form.resetFields();
            setPrimaryImageList([]);
            setGalleryImageList([]);
            setFilteredSubCategories([]);
        }
    }, [productData, isModalOpen]);

    const handlePriceChange = () => {
        const { mrp, sellingPrice } = form.getFieldsValue();
        if (mrp && sellingPrice) {
            const discount = Math.max(0, Math.round(((mrp - sellingPrice) / mrp) * 100));
            form.setFieldsValue({ discount });
        }
    };

    const getFileList = setter => e => {
        const files = Array.isArray(e) ? e : e?.fileList || [];
        setter(files);
        return files;
    };

    const handleRemove = (file, setter) => {
        setter(list => list.filter(item => item.uid !== file.uid));
        return true;
    };

    const onFinish = values => {
        const updatedData = {
            ...productData,
            ...values,
            primaryImageList,
            galleryImageList
        };
        console.log("Updated product data: ", updatedData);
        // Send API call here
        message.success("Product updated successfully!");
        handleOk();
    };

    return (
        <Modal
            title={`Edit Product: ${productData?.name || ''}`}
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Save Changes"
            width={800}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    {[{ name: 'name', label: 'Product Name' }, { name: 'sku', label: 'SKU' }].map(field => (
                        <Col span={12} key={field.name}>
                            <Form.Item name={field.name} label={field.label} rules={[{ required: true }]}>
                                <Input placeholder={`Enter ${field.label.toLowerCase()}`} />
                            </Form.Item>
                        </Col>
                    ))}
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="mrp" label="MRP (₹)" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} onChange={handlePriceChange} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="sellingPrice" label="Selling Price (₹)" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} onChange={handlePriceChange} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="discount" label="Discount (%)">
                            <InputNumber readOnly min={0} max={100} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="unitOfMeasurement" label="Unit of Measurement" rules={[{ required: true }]}>
                            <Input placeholder="e.g., grams" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="sellingUnit" label="Selling Unit" rules={[{ required: true }]}>
                            <Input placeholder="e.g., 1 pack" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item name="serviceId" label="Service Type" rules={[{ required: true }]}>
                            <Select placeholder="Select service">
                                <Option value="67ecc79120a93fc0b92a8b19">Food</Option>
                                <Option value="67ecc79a20a93fc0b92a8b1b">Grocery</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                            <Select placeholder="Select type">
                                <Option value="veg">Veg</Option>
                                <Option value="nonveg">Non-Veg</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select category"
                                onChange={value => {
                                    setSelectedCategory(value);
                                    const subCats = subCategories.filter(sub => sub.cat_id?._id === value);
                                    setFilteredSubCategories(subCats);
                                    form.setFieldsValue({ subCategory: undefined });
                                }}
                            >
                                {categories.map(cat => (
                                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="subCategory" label="Sub-Category" rules={[{ required: true }]}>
                            <Select placeholder="Select sub-category" disabled={!selectedCategory}>
                                {filteredSubCategories.map(sub => (
                                    <Option key={sub._id} value={sub._id}>{sub.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="shortDescription" label="Short Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item name="longDescription" label="Long Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="primary_image" label="Primary Image" valuePropName="fileList" getValueFromEvent={getFileList(setPrimaryImageList)}>
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false}
                                maxCount={1}
                                fileList={primaryImageList}
                                onRemove={file => handleRemove(file, setPrimaryImageList)}
                            >
                                {primaryImageList.length >= 1 ? null : (
                                    <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name="gallery_image" label="Gallery Images" valuePropName="fileList" getValueFromEvent={getFileList(setGalleryImageList)}>
                            <Upload.Dragger
                                listType="picture"
                                beforeUpload={() => false}
                                multiple
                                fileList={galleryImageList}
                                onRemove={file => handleRemove(file, setGalleryImageList)}
                            >
                                <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                                <p className="ant-upload-text">Click or drag to upload</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default EditFoodProductModal;
