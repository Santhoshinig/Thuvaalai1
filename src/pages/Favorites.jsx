import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Favorites.css';

const Favorites = () => {
    const { favorites, toggleFavorite, addToCart } = useShop();
    const navigate = useNavigate();

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <div className="container">
                    <header className="favorites-header-section">
                        <Link to="/collection" className="back-to-shop">
                            <ArrowLeft size={18} /> Back to Collection
                        </Link>
                        <h1 className="favorites-title">Your Wishlist</h1>
                        <p className="favorites-subtitle">
                            {favorites.length === 0
                                ? "Your wishlist is waiting to be filled."
                                : `You've saved ${favorites.length} items for later.`
                            }
                        </p>
                    </header>

                    {favorites.length === 0 ? (
                        <motion.div
                            className="empty-favorites"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="empty-icon-wrap">
                                <Heart size={60} strokeWidth={1} />
                            </div>
                            <h2>Your wishlist is empty</h2>
                            <p>Save items you love here to find them again easily. Simply click the heart icon on any product.</p>
                            <Link to="/collection" className="shop-now-btn">Start Exploring</Link>
                        </motion.div>
                    ) : (
                        <div className="favorites-grid">
                            <AnimatePresence mode="popLayout">
                                {favorites.map((item) => (
                                    <motion.div
                                        className="favorite-item-card"
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <div className="favorite-card-inner">
                                            <div className="favorite-image-box" onClick={() => navigate(`/product/${item.id}`)}>
                                                <img src={item.image} alt={item.name} />
                                                <div className="category-overlay">{item.categorySlug.replace('-', ' ')}</div>
                                                <button
                                                    className="remove-fav"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(item);
                                                    }}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>

                                            <div className="favorite-info-box">
                                                <div onClick={() => navigate(`/product/${item.id}`)}>
                                                    <h3>{item.name}</h3>
                                                    <p className="fav-price">{item.price}</p>
                                                </div>

                                                <div className="favorite-actions">
                                                    <button
                                                        className="add-to-basket-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart(item);
                                                        }}
                                                    >
                                                        <ShoppingBag size={18} /> Add to Basket
                                                    </button>
                                                    <button
                                                        className="view-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/product/${item.id}`);
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Favorites;
