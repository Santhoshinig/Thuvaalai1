import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Truck, Shield, Star, ArrowLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS } from '../data/products';
import Footer from '../components/Footer';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleFavorite, isFavorite } = useShop();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const foundProduct = ALL_PRODUCTS.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/collection');
        }
    }, [id, navigate]);

    if (!product) return null;

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="container">
                    {/* Breadcrumbs */}
                    <div className="product-breadcrumbs">
                        <button onClick={() => navigate(-1)} className="back-link">
                            <ArrowLeft size={18} /> Back
                        </button>
                        <Link to="/" className="breadcrumb-nav">Home</Link> <ChevronRight size={14} />
                        <Link to="/collection" className="breadcrumb-nav">Collection</Link> <ChevronRight size={14} />
                        <span className="current">{product.name}</span>
                    </div>

                    <div className="product-main-layout">
                        {/* Left: Gallery */}
                        <div className="product-detail-gallery">
                            <div className="gallery-main">
                                <motion.img
                                    key={activeImage}
                                    src={product.image}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <button
                                    className={`fav-btn ${isFavorite(product.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(product)}
                                >
                                    <Heart size={24} fill={isFavorite(product.id) ? "var(--color-accent)" : "none"} />
                                </button>
                            </div>
                            <div className="gallery-thumbs">
                                {[0, 1, 2, 3].map((idx) => (
                                    <div
                                        key={idx}
                                        className={`thumb ${activeImage === idx ? 'active' : ''}`}
                                        onClick={() => setActiveImage(idx)}
                                    >
                                        <img src={product.image} alt="Thumbnail" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Info Card */}
                        <motion.div
                            className="product-detail-info"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="info-card">
                                <span className="category-tag">{product.categorySlug.replace('-', ' ')}</span>
                                <h1 className="product-name">{product.name}</h1>

                                <div className="rating-row">
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={16} fill="#FFD700" stroke="none" />
                                        ))}
                                    </div>
                                    <span className="reviews">4.9 (1.2k Reviews)</span>
                                </div>

                                <div className="price-box">
                                    <span className="current-price">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="mrp">{product.originalPrice}</span>
                                    )}
                                    <span className="discount">SAVE 15%</span>
                                </div>

                                <div className="description-block">
                                    <h3>Description</h3>
                                    <p>{product.description || "Experience the cloud-like softness of Thuvaalai's signature cotton. Woven with 100% organic fibers, this towel is designed to be as gentle as a mother's touch."}</p>
                                </div>

                                <div className="selection-row">
                                    <div className="select-item">
                                        <label>Color</label>
                                        <div className="color-options">
                                            <span className="color-dot active" style={{ background: '#fff', border: '1px solid #ddd' }}></span>
                                            <span className="color-dot" style={{ background: '#f8c8dc' }}></span>
                                            <span className="color-dot" style={{ background: '#add8e6' }}></span>
                                        </div>
                                    </div>
                                    <div className="select-item">
                                        <label>Size</label>
                                        <select className="size-select">
                                            <option>Standard (70x140cm)</option>
                                            <option>Large (90x160cm)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="cta-actions">
                                    <button className="add-cart-btn" onClick={() => addToCart(product)}>
                                        <ShoppingBag size={18} /> Add to Basket
                                    </button>
                                    <button className="buy-btn">Buy It Now</button>
                                </div>

                                <div className="trust-notes">
                                    <div className="note">
                                        <Truck size={20} />
                                        <span>Free delivery on orders above ₹999</span>
                                    </div>
                                    <div className="note">
                                        <Shield size={20} />
                                        <span>100% Organic Cotton Certified</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Suggested Products Section */}
                    <div className="suggested-products-section" style={{ marginTop: '8rem', marginBottom: '4rem' }}>
                        <h2 className="section-title">You Might Also Love</h2>
                        <div className="product-grid">
                            {ALL_PRODUCTS
                                .filter(p => p.id !== product.id)
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 4)
                                .map((item) => (
                                    <motion.div
                                        className="product-card"
                                        key={item.id}
                                        whileHover={{ y: -10 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        onClick={() => {
                                            navigate(`/product/${item.id}`);
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <div className="product-image-wrapper">
                                            <div className="product-image-placeholder" style={{ backgroundImage: `url(${item.image})` }}></div>
                                        </div>
                                        <div className="product-info">
                                            <h3>{item.name}</h3>
                                            <div className="price-display" style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', alignItems: 'center' }}>
                                                {item.originalPrice && (
                                                    <span className="old-price" style={{ color: '#aaa', textDecoration: 'line-through', fontSize: '0.9rem' }}>{item.originalPrice}</span>
                                                )}
                                                <span className="current-price" style={{ color: 'var(--color-accent)', fontWeight: '700', fontSize: '1.1rem' }}>{item.price}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
