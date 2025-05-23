import React from 'react'
import { Button, Col, Form, Input, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function Document({ form }) {

    return (
        <>
            <Form.Item name="panNo" label="Business PAN Number" rules={[{ required: true, message: "Business PAN Number is required" }, { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Enter a valid PAN" }]}>
                <Input onChange={(e) => form.setFieldsValue({ panNo: e.target.value.toUpperCase() })} />
            </Form.Item>

            <Form.Item name="gstNo" label="GST Number" rules={[{ pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: "Enter a valid GST Number" }]}>
                <Input onChange={(e) => form.setFieldsValue({ gstNo: e.target.value.toUpperCase() })} />
            </Form.Item>

            <Form.Item name="foodLicense" label="Food License Number" rules={[{ pattern: /^[0-9]{14}$/, message: "Enter valid Food License Number" }]}>
                <Input onChange={(e) => form.setFieldsValue({ foodLicense: e.target.value.toUpperCase() })} />
            </Form.Item>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="panImage" label="PAN Card Image" valuePropName="fileList" getValueFromEvent={e => e.fileList} rules={[{ required: true, message: "Pan card image is required" }]}>
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="gstImage" label="GST Image" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="foodImage" label="Food License Image" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default Document
