import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, X, Star, ShoppingBag, Truck, Shield } from 'lucide-react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <button className="close-modal-btn" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="product-detail-layout">
                        {/* Left: Thumbnails & Main Image Gallery */}
                        <div className="product-gallery">
                            <div className="thumbnails-col">
                                {[0, 1, 2, 3].map((idx) => (
                                    <div
                                        key={idx}
                                        className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                                        onClick={() => setActiveImage(idx)}
                                    >
                                        <img src={product.image || "/images/hero_baby_towel.png"} alt="Thumbnail" />
                                    </div>
                                ))}
                            </div>
                            <div className="main-image-frame">
                                <motion.img
                                    key={activeImage}
                                    src={product.image || "/images/hero_baby_towel.png"}
                                    alt="Main View"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <button className="favorite-btn-large">
                                    <Heart size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="product-info-panel">
                            <div className="breadcrumb">Home / Baby Bath / Premium Towels</div>
                            <h2 className="modal-title">{product.name}</h2>

                            <div className="reviews-row">
                                <div className="stars">
                                    <Star size={16} fill="#FFD700" stroke="none" />
                                    <Star size={16} fill="#FFD700" stroke="none" />
                                    <Star size={16} fill="#FFD700" stroke="none" />
                                    <Star size={16} fill="#FFD700" stroke="none" />
                                    <Star size={16} fill="#FFD700" stroke="none" />
                                </div>
                                <span className="review-count">(1,996+ Reviews)</span>
                            </div>

                            <div className="price-row">
                                <span className="current-price">{product.price}</span>
                                <span className="original-price">$65.00</span>
                                <span className="discount-tag">30% OFF</span>
                            </div>

                            <p className="product-description">
                                Experience the cloud-like softness of Thuvaalai's signature cotton.
                                Woven with 100% organic fibers, this towel is designed to be as gentle
                                as a mother's touch. Hypoallergenic, ultra-absorbent, and free from harmful chemicals.
                            </p>

                            <div className="variant-selector">
                                <label>Select Design</label>
                                <select className="premium-select">
                                    <option>Classic Pure White</option>
                                    <option>Soft Blush Pink</option>
                                    <option>Sky Blue Breeze</option>
                                </select>
                            </div>

                            <div className="actions-row">
                                <button className="add-to-cart-btn">
                                    Add to Basket
                                </button>
                                <button className="buy-now-btn">
                                    Buy Now
                                </button>
                            </div>

                            <div className="trust-badges">
                                <div className="badge">
                                    <Truck size={20} />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="badge">
                                    <Shield size={20} />
                                    <span>Organic Certified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductModal;
