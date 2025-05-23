import { RightOutlined } from '@ant-design/icons'
import { Button, Card, Carousel } from 'antd'
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Utility function to generate color and progress dynamically
const getColorAndProgress = (index) => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6']
    const color = colors[index % colors.length]
    const progress = 20 + (index * 10) % 60 // Generate a % between 20-80
    return { color, progress }
}

function CategorySlider({ data }) {
    const navigate = useNavigate()

    return (
        <div className="mt-8">
            <div className='flex justify-between items-center mb-6 px-4'>
                <div className='flex items-center gap-3'>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Categories</h3>
                    <span className='px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full'>
                        {data?.length || 0}
                    </span>
                </div>
                <Button
                    type="text"
                    className='flex items-center text-gray-600 dark:text-gray-300'
                    icon={<RightOutlined className='text-sm' />}
                    onClick={() => navigate("/admin/category")}
                >
                    View All
                </Button>
            </div>

            <div className="px-4">
                <Carousel dots={true} autoplay={true} draggable>
                    {data.map((category, index) => {
                        const { color, progress } = getColorAndProgress(index)
                        return (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className="!rounded-2xl !border-0 transition-all max-w-md mx-auto"
                                    style={{ backgroundColor: `${color}08` }}
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div
                                                className="p-3 rounded-xl"
                                                style={{
                                                    backgroundColor: `${color}20`,
                                                    color: color
                                                }}
                                            >
                                                <img
                                                    src={`${BASE_URL}/${category.image}`}
                                                    alt={category.name}
                                                    className="w-8 h-8 object-cover rounded-full"
                                                />
                                            </div>
                                            <span
                                                className="text-sm font-semibold"
                                                style={{ color: color }}
                                            >
                                                +{progress}%
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                                                {category.name}
                                            </h4>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {category.productCount} products
                                            </p>
                                        </div>

                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="rounded-full h-2"
                                                style={{
                                                    width: `${progress}%`,
                                                    backgroundColor: color
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default CategorySlider
