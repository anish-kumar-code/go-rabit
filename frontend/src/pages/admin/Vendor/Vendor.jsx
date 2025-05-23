import { Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import VendorTable from './components/VendorTable'
import { deleteVendor, getAllVendor } from '../../../services/apiVendor'

function Vendor() {
    const [searchText, setSearchText] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchVendor() }, [])

    const fetchVendor = async () => {
        setLoading(true)
        try {
            const res = await getAllVendor()
            setDataSource(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (record) => {
        console.log(record)
        Modal.confirm({
            title: 'Delete Vendor',
            content: `Are you sure you want to delete "${record.name}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await deleteVendor(record._id);
                    message.success("Vendor deleted successfully!");
                    fetchVendor();
                } catch {
                    message.error("Failed to delete vendor.");
                }
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
            </div>
            <VendorTable data={dataSource} searchText={searchText} onDelete={handleDelete} loading={loading} />
        </>
    )
}

export default Vendor
