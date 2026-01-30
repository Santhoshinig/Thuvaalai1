import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import InstaAnimation from '../components/InstaAnimation';
import { Instagram } from 'lucide-react';
import '../App.css';

const Story = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="story-page">
            <Navbar />
            <div className="section" style={{ paddingTop: '12rem', minHeight: '100vh', background: 'var(--color-bg-alt)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">Our Philosophy</h2>

                        <div className="about-layout-split" style={{ alignItems: 'center' }}>
                            {/* Left: Text Content */}
                            <div className="about-text" style={{ textAlign: 'left' }}>
                                <h3>Pure. Ethical. Sustainable.</h3>
                                <p>
                                    By making the towels from pure cotton, without any additive polyester, Thuvaalai towels completely decompose when disposed. Even our labels & packaging!
                                </p>
                                <p className="highlight-text" style={{ fontSize: '1.4rem', color: 'var(--color-primary)', margin: '2rem 0' }}>
                                    "Our towels are made from 100% organic cotton that is ethically sourced from a select few farms in and around Tamilnadu."
                                </p>
                                <p>
                                    The Farmers & Weavers are directly benefited from Thuvaalai's sale. No middlemen involved.
                                </p>
                                <p>
                                    <strong>Choose a greener Earth, Choose Thuvaalai!</strong>
                                </p>
                            </div>

                            {/* Right: Instagram Animation */}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <motion.div
                                    className="insta-mockup-wrapper"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <InstaAnimation />
                                    {/* Overlay Button Layer */}
                                    <div className="insta-cta-overlay" style={{ opacity: 1, bottom: '20%' }}>
                                        <a href="https://www.instagram.com/thuvaalai/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Instagram size={18} /> Follow
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Story;
