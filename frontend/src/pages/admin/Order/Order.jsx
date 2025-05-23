import { Breadcrumb, Button, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'
import OrderTable from './components/OrderTable'
import { getAllOrder } from '../../../services/vendor/apiOrder'

function Order() {
    const [searchText, setSearchText] = useState('');


    const handleDelete = (user) => {
        Modal.confirm({
            title: 'Delete User',
            content: `Are you sure you want to delete "${user.name}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                console.log('Deleting category:', user);
            }
        });
    };

    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
                <Input.Search
                    placeholder="Search by name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        maxWidth: 300,
                        borderRadius: '6px'
                    }}
                    size="large"
                />
                {/* <Button
                    type='primary'
                    icon={<FaPlus />}
                    size="large"
                    className="hover:opacity-90 transition-all duration-300"
                    onClick={showModal}
                >
                    Add Sub Category
                </Button> */}
            </div>
            <OrderTable searchText={searchText} onDelete={handleDelete} />

            {/* modal */}
            {/* <AddSubCategoryModel
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            /> */}

            {/* edit modal */}
            {/* <EditSubCategoryModel
                isModalOpen={isEditModalOpen}
                handleOk={handleEditOk}
                handleCancel={handleEditCancel}
                categoryData={selectedCategory}
            /> */}
        </>
    )
}

export default Order
