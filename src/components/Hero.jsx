import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="hero-section" id="home">
            <div className="hero-image-container">
                <motion.img
                    src="/images/hero_baby_towel.png"
                    alt="Baby in Thuvaalai Premium Towel"
                    className="hero-image"
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, transition: { duration: 10 } }}
                />
                <div className="overlay"></div>
            </div>

            <div className="hero-content container">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                >
                    <motion.span
                        className="subtitle"
                        initial={{ opacity: 0, letterSpacing: "2px" }}
                        animate={{ opacity: 1, letterSpacing: "4px" }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        PURE 100% COTTON
                    </motion.span>
                    <h1>Wrapped in <br /><span className="highlight">Purest Love</span></h1>
                    <p>Experience the gentle touch of nature with our premium, ultra-soft cotton towels designed for delicate skin. "Thuvaalai" - Woven for comfort, crafted for you.</p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => navigate('/collection')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Collection
                        </motion.button>
                        <motion.button
                            className="btn btn-outline"
                            onClick={() => navigate('/story')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Discover More
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
