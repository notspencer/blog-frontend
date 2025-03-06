import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-[#FAD2B7] min-h-[500px] flex items-center"
        >
            <div className="container mx-auto grid md:grid-cols-2 px-8">
                <div className="flex flex-col justify-center relative">
                    <p className="text-xl text-[#4B4B4B] font-medium">
                        Innovate faster, code smarter, inspire greater
                    </p>
                    <h2 className="text-5xl font-bold text-[#173A2F] mt-2 font-extrabold drop-shadow-sm">
                        Tech Trends & Programming Wisdom
                    </h2>
                </div>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src="src/assets/hero-image.png"
                        alt="People collaborating on laptop"
                        className="rounded-xl shadow-lg"
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
