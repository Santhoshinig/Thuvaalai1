import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Filter, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, CATEGORY_LABELS, COLORS } from '../data/products';
import './Collection.css';

const Collection = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');
    const { toggleFavorite, isFavorite } = useShop();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategories([categoryFromUrl]);
        }
    }, [categoryFromUrl]);

    const products = useMemo(() => {
        return ALL_PRODUCTS.filter((p) => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.categorySlug);
            const colorMatch = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c));
            return categoryMatch && colorMatch;
        });
    }, [selectedCategories, selectedColors]);

    const handleCategoryChange = (slug) => {
        setSelectedCategories(prev =>
            prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
        );
    };

    const handleColorChange = (color) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    return (
        <div className="collection-page">
            <div style={{ paddingTop: '80px' }}> {/* Padding for fixed navbar */}
                <div className="container">
                    <motion.div
                        className="collection-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', margin: '4rem 0' }}
                    >
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '400' }}>
                            Shop All Essentials
                        </h1>
                        <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Crafted with care, woven with heritage. Explore our collection of premium organic cotton textiles.
                        </p>
                    </motion.div>

                    <div className="collection-layout">
                        {/* Mobile Filter Toggle Button */}
                        <button
                            className="mobile-filter-toggle"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Filter size={18} /> Filters
                        </button>

                        {/* Overlay Backdrop for Mobile */}
                        <div
                            className={`filter-overlay ${isSidebarOpen ? 'active' : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        />

                        {/* Filters Sidebar */}
                        <aside className={`filters-sidebar ${isSidebarOpen ? 'active' : ''}`}>
                            <div className="mobile-filter-header">
                                <h2>Filters</h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="filter-section">
                                <h3>Category</h3>
                                <div className="filter-list">
                                    {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
                                        <div key={slug} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={`cat-${slug}`}
                                                checked={selectedCategories.includes(slug)}
                                                onChange={() => handleCategoryChange(slug)}
                                            />
                                            <label htmlFor={`cat-${slug}`}>{label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <h3>Color</h3>
                                <div className="filter-list">
                                    {COLORS.map((color) => (
                                        <div key={color} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={`color-${color}`}
                                                checked={selectedColors.includes(color)}
                                                onChange={() => handleColorChange(color)}
                                            />
                                            <label htmlFor={`color-${color}`}>{color}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="collection-main">
                            <div className="product-grid" style={{ marginBottom: '6rem' }}>
                                <AnimatePresence mode="popLayout">
                                    {products.map((item) => (
                                        <motion.div
                                            className="product-card"
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => navigate(`/product/${item.id}`)}
                                        >
                                            <div className="product-image-wrapper">
                                                <div className="product-badges">
                                                    <span className="badge-sale">Sale</span>
                                                </div>
                                                <div className="product-image-placeholder" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                <div className="wishlist-overlay">
                                                    <button
                                                        className={`wishlist-btn ${isFavorite(item.id) ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleFavorite(item);
                                                        }}
                                                    >
                                                        <Heart size={20} fill={isFavorite(item.id) ? "var(--color-accent)" : "none"} stroke={isFavorite(item.id) ? "var(--color-accent)" : "currentColor"} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-info">
                                                <span style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                    {CATEGORY_LABELS[item.categorySlug] || item.categorySlug}
                                                </span>
                                                <h3>{item.name}</h3>
                                                <div className="price-display">
                                                    <span className="old-price">{item.originalPrice}</span>
                                                    <span className="current-price">{item.price}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {products.length === 0 && (
                                    <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                                        <p style={{ color: '#999', fontSize: '1.2rem' }}>No products found matching your selection.</p>
                                        <button
                                            onClick={() => { setSelectedCategories([]); setSelectedColors([]); }}
                                            style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Collection;
