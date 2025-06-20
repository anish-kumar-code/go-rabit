import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../utils/axiosInstance';

function VendorLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { vendorLogin } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('/api/vendor/login', values);
            if (res.data.status) {
                vendorLogin(res.data.data.user, res.data.token);
                message.success('Login successful!');
                navigate('/vendor');
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <title>GoRabit | Vendor Login</title>
            <div className="flex min-h-screen bg-gray-100 lg:h-screen">
                {/* Left image */}
                <div className="hidden lg:flex w-1/2 justify-center items-center bg-gray-200">
                    <img
                        src="https://cdn.pixabay.com/photo/2024/07/10/09/30/grocery-8885334_1280.jpg"
                        alt="Login Visual"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right form in card */}
                <div className="flex w-full lg:w-1/2 justify-center items-center px-4 sm:px-6 py-12">
                    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
                        <h2 className="text-4xl font-bold text-center text-green-600 mb-2">Vendor Login</h2>
                        <p className="text-sm text-gray-500 text-center mb-8">Sign in to manage your store</p>

                        <Form
                            name="vendorLogin"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            autoComplete="off"
                        >
                            <Form.Item
                                label="User Id"
                                name="userId"
                                rules={[{ required: true, message: 'Please enter your user id!' }]}
                                className="mb-4"
                            >
                                <Input size="large" placeholder="Enter your user id" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please enter your password!' }]}
                                className="mb-6"
                            >
                                <Input.Password size="large" placeholder="********" />
                            </Form.Item>

                            <Form.Item className="mb-0">
                                <Button type="primary" htmlType="submit" loading={loading} block size="large" >
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="text-sm text-gray-500 mb-8 my-4">Register as <Link to={'/vendor/register'} className='text-blue-500'>New Vendor</Link>!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorLogin;
