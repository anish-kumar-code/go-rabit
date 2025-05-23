import { Input, Modal } from 'antd'
import React, { useState } from 'react'
import OrderTable from './components/OrderTable'

function Order() {
    const [searchText, setSearchText] = useState('');

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
            <OrderTable searchText={searchText} />
        </>
    )
}

export default Order
