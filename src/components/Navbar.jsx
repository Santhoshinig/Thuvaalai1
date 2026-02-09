import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount, favorites } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="promo-strip">
        <div className="container">
          <div className="promo-strip-inner">
            <span>Free shipping above ₹999 within India</span>
            <span>International shipping available on select products</span>
            <span>Use code WELCOME to unlock a first-order offer</span>
          </div>
        </div>
      </div>
      <div className="container navbar-content">
        <Link to="/" className="logo" onClick={scrollToTop}>
          <span className="logo-brand-name">Thuvaalai</span>
        </Link>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="logo-brand-name">Thuvaalai</span>
          </div>
          <Link
            to="/"
            onClick={scrollToTop}
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/collection"
            onClick={() => setIsOpen(false)}
            className={`nav-link ${isActive('/collection') ? 'active' : ''
              }`}
          >
            Collection
          </Link>
          <Link
            to="/story"
            onClick={() => setIsOpen(false)}
            className={`nav-link ${isActive('/story') ? 'active' : ''}`}
          >
            Our Story
          </Link>

        </div>

        <div className="nav-icons">
          <button className="icon-btn search-btn">
            <Search size={20} />
          </button>
          <Link to="/favorites" className="icon-btn favorite-btn" onClick={() => setIsOpen(false)}>
            <Heart size={20} fill={favorites.length > 0 ? "var(--color-accent)" : "none"} stroke={favorites.length > 0 ? "var(--color-accent)" : "currentColor"} />
            {favorites.length > 0 && <span className="cart-count">{favorites.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn cart-btn" onClick={() => setIsOpen(false)}>
            <ShoppingBag size={20} />
            <span className="cart-count">{cartCount}</span>
          </Link>
          <button className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
