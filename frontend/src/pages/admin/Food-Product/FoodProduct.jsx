import React, { useEffect, useState } from 'react';
import { Breadcrumb, Input, Button, Modal, message, Spin } from 'antd';
import { Link, useParams } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import FoodProductTable from './components/FoodProductTable';
import AddFoodProductModel from './components/AddFoodProductModal';
import EditFoodProductModel from './components/EditFoodProductModal';
import { getAllProducts } from '@services/apiProduct';
import { getAllCategory, getAllSubCategory } from '@services/apiCategory';
import { getAllVendor } from '@services/apiVendor';
import { getAllBrand } from '@services/apiBrand';
const FOOD_ID = import.meta.env.VITE_FOOD_ID;
const GROCERY_ID = import.meta.env.VITE_GROCERY_ID;

const FoodProduct = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brand, setBrand] = useState([])
    const [vendor, setVendor] = useState([])

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const productList = await getAllProducts();
            setProducts(productList);
        } catch {
            message.error('Error fetching product list');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, []);

    useEffect(() => {
        const fetchMetaData = async () => {
            const categoryList = await getAllCategory();
            const subCategoryList = await getAllSubCategory();
            const brandList = await getAllBrand()
            const vendorList = await getAllVendor();
            setCategories(categoryList);
            setSubCategories(subCategoryList);
            setBrand(brandList);
            setVendor(vendorList)
        }
        fetchMetaData()
    }, [])

    const transformedSubCategories = subCategories.reduce((acc, subCat) => {
        const catId = subCat.cat_id._id;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(subCat);
        return acc;
    }, {});

    const handleDelete = (product) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: `This will permanently delete "${product.product_name}"`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No, Cancel',
            onOk: () => console.log('Deleting product:', product),
        });
    };

    // if (loading) return <Spin size="large" fullscreen />;

    return (
        <>

            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between'>
                <Input.Search
                    placeholder="Search by product name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ maxWidth: 300, borderRadius: '6px' }}
                    size="large"
                />
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                >
                    {/* {serviceName == 'food' ? "Add Food Product" : "Add Grocery Product"} */}
                    Add Product
                </Button>
            </div>

            <FoodProductTable
                searchText={searchText}
                data={products}
                onEdit={(product) => {
                    setSelectedProduct(product);
                    setIsEditModalOpen(true);
                }}
                onDelete={handleDelete}
                loading={loading}
            />

            <AddFoodProductModel
                isModalOpen={isModalOpen}
                handleOk={() => { setIsModalOpen(false); fetchProduct() }}
                handleCancel={() => setIsModalOpen(false)}
                data={{ categories, brand, vendor, transformedSubCategories, subCategories }}
            />

            <EditFoodProductModel
                isModalOpen={isEditModalOpen}
                handleOk={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                    fetchProduct();
                }}
                handleCancel={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                }}
                productData={selectedProduct}
                data={{ categories, brand, vendor, transformedSubCategories, subCategories }}
            />
        </>
    );
};

export default FoodProduct;
