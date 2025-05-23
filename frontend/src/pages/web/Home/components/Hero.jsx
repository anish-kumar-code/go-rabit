import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow, Autoplay } from 'swiper/modules'

const slides = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
]

function Hero() {
    return (
        <section id="home" className="relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-green-900/80"></div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-green-50/10 backdrop-blur-sm"></div>
                
                {/* Animated SVG Pattern */}
                <motion.svg 
                    viewBox="0 0 100 100"
                    className="absolute top-0 left-0 w-full opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="50" cy="50" r="45" stroke="#fff" strokeWidth="2" fill="none" />
                    <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" 
                          fill="none" stroke="#fff" strokeWidth="1" />
                </motion.svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-28 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center lg:text-left">
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Fresh Groceries, 
                                <span className="block bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
                                    Delivered Fast
                                </span>
                            </motion.h1>
                            
                            <motion.p
                                className="text-xl text-green-100 mb-8 max-w-xl mx-auto lg:mx-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Your favorite markets and restaurants at your fingertips. 
                                Earn rewards with every order!
                            </motion.p>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.6 }}
                            >
                                <button className="bg-green-400 hover:bg-green-300 text-green-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Download App Now
                                    <span className="ml-3">🚀</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image Carousel */}
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-green-400/20 rounded-3xl shadow-2xl -rotate-3"></div>
                        <div className="relative rotate-3">
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                    slideShadows: true,
                                }}
                                autoplay={{ delay: 3000 }}
                                loop={true}
                                modules={[EffectCoverflow, Autoplay]}
                                className="swiper-container"
                            >
                                {slides.map((src, index) => (
                                    <SwiperSlide key={index} className="max-w-md rounded-2xl overflow-hidden">
                                        <div className="relative group">
                                            <img 
                                                src={src} 
                                                alt={`Slide ${index}`}
                                                className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-8 h-14 rounded-3xl border-2 border-green-300 flex justify-center p-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero