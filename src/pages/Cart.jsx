import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();
    const navigate = useNavigate();

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="container">
                    <header className="cart-header-section">
                        <Link to="/collection" className="continue-shopping">
                            <ArrowLeft size={18} /> Continue Shopping
                        </Link>
                        <h1 className="cart-title">Your Shopping Basket</h1>
                        <p className="cart-count-info">
                            {cart.length === 0 ? 'Wait, your basket is empty!' : `You have ${cart.length} items ready to go.`}
                        </p>
                    </header>

                    {cart.length === 0 ? (
                        <motion.div
                            className="empty-cart"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="empty-cart-icon">
                                <ShoppingBag size={80} />
                            </div>
                            <h2>Your basket is empty</h2>
                            <p>Looks like you haven't added anything to your basket yet. Explore our collection to find something special.</p>
                            <Link to="/collection" className="explore-btn">Explore Collection</Link>
                        </motion.div>
                    ) : (
                        <div className="cart-grid">
                            <div className="cart-items-column">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="cart-card"
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <div className="cart-card-image" onClick={() => navigate(`/product/${item.id}`)}>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-card-details">
                                                <div className="detail-header">
                                                    <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                                                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <p className="item-category">Organic Cotton</p>
                                                <div className="detail-footer">
                                                    <div className="quantity-controls">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                            <Minus size={16} />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="item-price-info">
                                                        <span className="unit-price">{item.price} each</span>
                                                        <span className="subtotal-price">
                                                            ₹{(parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <aside className="cart-summary-column">
                                <div className="summary-card">
                                    <h3>Order Summary</h3>
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Estimated Shipping</span>
                                        <span className="free">FREE</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Tax (Included)</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="summary-divider"></div>
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <button className="checkout-btn">
                                        Secure Checkout <ArrowRight size={20} />
                                    </button>
                                    <div className="payment-icons">
                                        {/* Mock payment icons */}
                                        <div className="mock-payment">VISA</div>
                                        <div className="mock-payment">MC</div>
                                        <div className="mock-payment">UPI</div>
                                    </div>
                                    <p className="secure-note">
                                        Our checkout is 100% secure. Your data is protected by industry standard encryption.
                                    </p>
                                </div>

                                <div className="promo-card">
                                    <label>Have a promo code?</label>
                                    <div className="promo-input">
                                        <input type="text" placeholder="Enter code" />
                                        <button>Apply</button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
