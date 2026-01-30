import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const CATEGORY_LABELS = {
  'bath-towels': 'Bath Towels',
  'hooded-towels': 'Hooded Towels',
  'washcloths': 'Washcloths & Sets',
  'gift-boxes': 'Gift Boxes',
};

const ALL_PRODUCTS = [
    { id: 1, name: "Velvet Cloud Bath Towel", price: "₹2,500", image: "/images/product_white.png", categorySlug: "bath-towels" },
    { id: 2, name: "Purest Hug Hooded Towel", price: "₹3,200", image: "/images/product_pink.png", categorySlug: "hooded-towels" },
    { id: 3, name: "Sky Blue Gentle Wrap", price: "₹2,800", image: "/images/product_blue.png", categorySlug: "hooded-towels" },
    { id: 4, name: "Organic Cotton Washcloths (Set of 3)", price: "₹1,200", image: "/images/hero_baby_towel.png", categorySlug: "washcloths" },
    { id: 5, name: "Luxury Bath Robe", price: "₹4,500", image: "/images/product_white.png", categorySlug: "bath-towels" },
    { id: 6, name: "Travel Towel Set", price: "₹1,800", image: "/images/product_pink.png", categorySlug: "gift-boxes" },
    { id: 7, name: "Everyday Cotton Bath Towel", price: "₹1,899", image: "/images/product_white.png", categorySlug: "bath-towels" },
    { id: 8, name: "Bordered Hooded Towel", price: "₹2,299", image: "/images/product_pink.png", categorySlug: "hooded-towels" },
];

const Collection = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get('category');

    const products = useMemo(() => {
        if (!categorySlug) return ALL_PRODUCTS;
        return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
    }, [categorySlug]);

    const categoryTitle = categorySlug ? CATEGORY_LABELS[categorySlug] || 'Collection' : null;

    return (
        <div className="collection-page">
            <Navbar />
            <div style={{ paddingTop: '80px' }}> {/* Padding for fixed navbar */}
                <div className="container">
                    <motion.div
                        className="collection-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', margin: '4rem 0' }}
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {categoryTitle || 'The Complete Collection'}
                        </h1>
                        <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                            {categoryTitle
                                ? `All ${categoryTitle.toLowerCase()} – 100% organic cotton.`
                                : "Explore our full range of 100% organic cotton essentials tailored for your baby's comfort."}
                        </p>
                    </motion.div>

                    <div className="product-grid" style={{ marginBottom: '6rem' }}>
                        {products.map((item) => (
                            <motion.div
                                className="product-card"
                                key={item.id}
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => setSelectedProduct(item)}
                            >
                                <div className="product-image-wrapper">
                                    <div className="product-image-placeholder" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="wishlist-overlay">
                                        <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); }}>
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <span style={{ fontSize: '0.8rem', color: '#999', textTransform: 'uppercase' }}>{CATEGORY_LABELS[item.categorySlug] || item.categorySlug}</span>
                                    <h3>{item.name}</h3>
                                    <p className="price" style={{ color: 'var(--color-accent)' }}>{item.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />

                <Footer />
            </div>
        </div>
    );
};

export default Collection;
