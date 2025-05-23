import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import {
    TagsOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
    DollarCircleOutlined,
    CarOutlined,
    StarOutlined,
} from '@ant-design/icons';

const CountStats = () => {
    const stats = [
        // {
        //     title: 'Total Coupons',
        //     value: 24,
        //     icon: <TagsOutlined className="text-blue-500 text-xl" />,
        // },
        {
            title: 'Total Food Products',
            value: 120,
            icon: <ShopOutlined className="text-green-500 text-xl" />,
        },
        {
            title: 'Total Mart Products',
            value: 80,
            icon: <ShoppingCartOutlined className="text-purple-500 text-xl" />,
        },
        {
            title: "Today's Orders",
            value: 15,
            icon: <GiftOutlined className="text-yellow-500 text-xl" />,
        },
        {
            title: 'Wallet Balance',
            value: 4520,
            prefix: '₹',
            icon: <DollarCircleOutlined className="text-pink-500 text-xl" />,
        },
        // {
        //     title: 'Pending Deliveries',
        //     value: 5,
        //     icon: <CarOutlined className="text-red-500 text-xl" />,
        // },
        // {
        //     title: 'Ratings / Reviews',
        //     value: 132,
        //     icon: <StarOutlined className="text-orange-500 text-xl" />,
        // },
    ];

    return (
        <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
                    <Card className="rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <div className="text-gray-600 font-medium text-sm">{stat.title}</div>
                            {stat.icon}
                        </div>
                        <Statistic
                            value={stat.value}
                            prefix={stat.prefix}
                            className="mt-2 text-xl font-semibold"
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CountStats;
