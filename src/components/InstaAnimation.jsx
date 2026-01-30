import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Instagram, Check } from 'lucide-react';
import './InstaAnimation.css';

const InstaAnimation = () => {
    const [step, setStep] = useState('search'); // search, profile, tapping
    const [typedText, setTypedText] = useState('');
    const searchText = "thuvaalai";

    // Animation Sequence with Loop
    useEffect(() => {
        if (step === 'search') {
            setTypedText(''); // Reset typed text
            let index = 0;
            const typingInterval = setInterval(() => {
                setTypedText(searchText.slice(0, index + 1));
                index++;
                if (index === searchText.length) {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        setStep('profile');
                    }, 800);
                }
            }, 150);
            return () => clearInterval(typingInterval);
        } else if (step === 'profile') {
            // After showing profile and finger tap, restart the loop
            const restartTimeout = setTimeout(() => {
                setStep('search'); // Loop back to search
            }, 3500); // Wait 3.5 seconds on profile screen
            return () => clearTimeout(restartTimeout);
        }
    }, [step]);

    return (
        <div className="insta-phone-container">
            <div className="phone-bezel">
                <div className="phone-screen">
                    {/* Status Bar */}
                    <div className="status-bar">
                        <span>9:41</span>
                        <div className="status-icons">
                            <div className="signal"></div>
                            <div className="wifi"></div>
                            <div className="battery"></div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'search' && (
                            <motion.div
                                key="search"
                                className="search-screen"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="search-bar-ui">
                                    <Search size={16} color="#8e8e8e" />
                                    <span className="search-text">{typedText}<span className="cursor">|</span></span>
                                </div>
                                {typedText.length > 3 && (
                                    <motion.div
                                        className="search-result-item"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="avatar-circle"></div>
                                        <div className="search-info">
                                            <p className="username">thuvaalai</p>
                                            <p className="subtext">Thuvaalai Baby Essentials</p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {step === 'profile' && (
                            <motion.div
                                key="profile"
                                className="profile-screen"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <img src="/images/insta_mockup.png" alt="Profile" className="profile-bg-image" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step === 'profile' && (
                        <motion.div
                            className="finger-cursor"
                            initial={{ opacity: 0, x: 100, y: 100 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            👆
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstaAnimation;
