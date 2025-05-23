import { Carousel } from 'antd';
import { Button, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function SubCategorySlider({ data }) {
    const navigate = useNavigate();

    // Function to generate a random color
    const getRandomColor = () => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="mt-8">
            {/* Header */}
            <div className='flex justify-between items-center mb-6 px-4'>
                <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
                    Sub Categories
                    <span className='ml-2 text-sm text-primary bg-blue-100 px-2 py-1 rounded-full'>
                        {data.length}
                    </span>
                </h3>
                <Button
                    type="text"
                    className='flex items-center text-gray-600 dark:text-gray-300'
                    icon={<RightOutlined className='text-sm' />}
                    onClick={() => navigate("/admin/sub-category")}
                >
                    Explore All
                </Button>
            </div>

            {/* Carousel */}
            <Carousel dots={true} autoplay={true} draggable className="px-4">
                {data.map((category, index) => {
                    const progress = Math.floor(Math.random() * 51) + 50;
                    const color = getRandomColor();
                    const imageUrl = category.image;

                    return (
                        <motion.div
                            key={category._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                className="!rounded-2xl !border max-w-md mx-auto"
                                style={{ backgroundColor: `${color}08` }}
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                backgroundColor: `${color}20`,
                                                color: color
                                            }}
                                        >
                                            <img
                                                src={`${BASE_URL}/${imageUrl}`}
                                                alt={category.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                        </div>
                                        <span
                                            className="text-sm font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-800"
                                            style={{ color: color }}
                                        >
                                            {progress}%
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                                            {category.name}
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            {category.productCount} products
                                        </p>
                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-2"
                                            style={{
                                                width: `${progress}%`,
                                                backgroundColor: color
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default SubCategorySlider;
