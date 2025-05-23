import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, InputNumber, Spin, message, Input, Breadcrumb, Form, Space, Tooltip, Switch } from 'antd';
import { Link, useNavigate, useParams } from 'react-router';
import { getAllProductOfShop, updateProductStatus } from '@services/vendor/apiProduct';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteProduct, updateProduct } from '../../../services/vendor/apiProduct';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AllProduct() {
    const [products, setProducts] = useState([]);
    const [vendorDetails, setVendorDetails] = useState()
    const [shopDetails, setShopDetails] = useState()
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const { shopId } = useParams()

    const navigate = useNavigate();

    const fetchProduct = async (shopId) => {
        setLoading(true);
        try {
            const res = await getAllProductOfShop(shopId);
            if (res?.data?.length === 0) {
                message.error("No products found");
                setProducts([]);
            } else {
                setProducts(res.data.allProduct);
                setVendorDetails(res.data.vendorDetails);
                setShopDetails(res.data.shopDetails);
            }
        } catch (error) {
            // console.log(error)
            message.error('Error fetching product list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(shopId);
    }, []);

    const onDelete = async (id) => {
        try {
            const res = await deleteProduct(id)
            // console.log(res);
            fetchProduct(shopId);
        } catch (error) {
            message.error("Error in deleting product")
        }
    }

    const onEdit = (product) => {
        setCurrentProduct(product);
        setIsEditModalOpen(true);
    };

    const columns = [
        {
            title: '#',
            key: 'avatar',
            align: "center",
            render: (_, { primary_image, name }) => (
                <div className='flex items-center gap-3'>
                    <img
                        src={`${BASE_URL}/${primary_image}` || '?'}
                        alt="Product"
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 50 }}
                        loading='lazy'
                    />
                    {/* <b>{name}</b> */}
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center",
            render: (_, record) => (<>{record.name}</>)
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center",
            render: (_, record) => (<>{record.categoryId?.name}</>)
        },
        {
            title: 'Sub Category',
            dataIndex: 'subcategory',
            key: 'subcategory',
            align: "center",
            render: (_, record) => (<>{record.subCategoryId?.name}</>)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            align: "center",
            render: (_, record) => (<>{record.type}</>)
        },
        {
            title: 'Price',
            dataIndex: 'original_price',
            key: 'original_price',
            align: "center",
            render: (_, record) => (<>{`₹ ${record.vendorSellingPrice}`}</>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record?.status === "active"} onChange={(checked) => updateProductStatus(record._id, checked)} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Details"><Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(`/vendor/shop/${shopId}/product/${record._id}`)} /></Tooltip>
                    <Tooltip title="Edit"><Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}></Button></Tooltip>
                    <Tooltip title="Delete"><Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record._id)}></Button></Tooltip>
                </Space>
            )
        }
    ];

    if (loading) return <Spin size="large" fullscreen />;

    return (
        <>

            <Card>
                <div className='flex justify-between mb-4'>
                    <Input.Search
                        placeholder="Search by product name"
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ maxWidth: 300, borderRadius: '6px' }}
                        size="large"
                    />
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => navigate(`/vendor/shop/add/${shopId}`)}
                        >
                            Add Product
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    // dataSource={products}
                    dataSource={products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
                    rowKey="_id"
                    pagination={products?.length > 10 ? { pageSize: 10 } : false}
                />
            </Card>

            <Modal
                title="Edit Product"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={async () => {
                    const data = {
                        name: currentProduct.name,
                        vendorSellingPrice: currentProduct.vendorSellingPrice
                    }
                    try {
                        await updateProduct(currentProduct._id, data);
                        message.success("Product updated successfully");
                        setIsEditModalOpen(false);
                        fetchProduct(shopId);
                    } catch {
                        message.error("Update failed");
                    }
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            value={currentProduct?.name}
                            onChange={(e) =>
                                setCurrentProduct({ ...currentProduct, name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Vendor Selling Price">
                        <InputNumber
                            className='w-full'
                            min={0}
                            value={currentProduct?.vendorSellingPrice}
                            onChange={(value) =>
                                setCurrentProduct({ ...currentProduct, vendorSellingPrice: value })
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}

export default AllProduct;
