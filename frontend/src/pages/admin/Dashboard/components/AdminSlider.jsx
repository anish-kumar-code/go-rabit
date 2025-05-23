import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';

const slides = [
    {
        image: 'https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-1.jpg',
        title: 'Manage Your Marketplace',
        subtitle: 'Powerful Vendor Management Tools'
    },
    {
        image: 'https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-3.jpg',
        title: 'Real-time Analytics',
        subtitle: 'Monitor Business Performance Live'
    },
    {
        image: 'https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-4.jpg',
        title: 'Multi-vendor Support',
        subtitle: 'Seamless Shop Management'
    }
];

function AdminSlider() {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative group">
            <Carousel
                autoplay
                autoplaySpeed={5000}
                effect="fade"
                dots={{ className: 'custom-dots' }}
                arrows={true}
                prevArrow={<LeftOutlined className="text-white text-2xl" />}
                nextArrow={<RightOutlined className="text-white text-2xl" />}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[400px] md:h-[500px]">
                        {/* Image with overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt=""
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                    </div>
                ))}
            </Carousel>

            {/* 3D Hover Effect Container */}
            <div className="absolute inset-0 overflow-hidden transform perspective-2000">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            </div>
        </div>
    );
}

export default AdminSlider;