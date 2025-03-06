import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function NewsletterSection() {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isCursorVisible, setIsCursorVisible] = useState(false); // Track cursor visibility
    const newsletterRef = useRef(null); // Ref to newsletter section

    // Track mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth cursor movement
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

    // Update cursor position on mouse move
    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            setIsCursorVisible(true);
        };

        const handleMouseLeave = () => {
            setIsCursorVisible(false);
        };

        window.addEventListener('mousemove', moveCursor);

        // Check when mouse enters or leaves the newsletter section
        if (newsletterRef.current) {
            newsletterRef.current.addEventListener(
                'mouseenter',
                handleMouseEnter
            );
            newsletterRef.current.addEventListener(
                'mouseleave',
                handleMouseLeave
            );
        }

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            if (newsletterRef.current) {
                newsletterRef.current.removeEventListener(
                    'mouseenter',
                    handleMouseEnter
                );
                newsletterRef.current.removeEventListener(
                    'mouseleave',
                    handleMouseLeave
                );
            }
        };
    }, [mouseX, mouseY]);

    return (
        <section
            ref={newsletterRef}
            className="relative bg-white py-16 px-6 md:px-24 lg:px-18 text-center overflow-hidden"
            style={{
                cursor: 'none', // Hide default cursor
                background: `url('src/assets/wave.svg') no-repeat center bottom`,
                backgroundSize: 'cover',
            }} // Wave SVG background
        >
            {/* Custom Cursor (Paper Plane) */}
            {isCursorVisible && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-50"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        scale: cursorVariant === 'hover' ? 1.8 : 1.3, // Enlarged paper plane
                        opacity: cursorVariant === 'hover' ? 1 : 0.7,
                    }}
                >
                    {/* Larger SVG Paper Plane */}
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="yellow"
                        stroke="orange"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-16 h-16" // Adjusted size
                    >
                        <path d="M10.5 13.5L21 3 3 10.5l7.5 3 3 7.5 3-7.5z" />
                    </svg>
                </motion.div>
            )}

            {/* Animated Heading Moving Right to Left */}
            <div className="relative overflow-hidden w-full">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold text-green-900 tracking-wide whitespace-nowrap"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: 'linear',
                    }}
                >
                    Stay up to date
                </motion.h2>
            </div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto"
            >
                Tips, discussions, news, and insights on IT and computer
                science. Stay updated with the latest trends and innovations.
                Subscribe now for exclusive content!!
            </motion.p>

            {/* CTA Button with Hover Effect */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-6 px-6 py-3 text-lg font-medium text-green-900 border-2 border-green-900 rounded-full hover:bg-green-900 hover:text-white transition"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
            >
                Yes, send it to me!
            </motion.button>
        </section>
    );
}
