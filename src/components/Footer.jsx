import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-premium">
            <div className="container footer-content">


                <div className="footer-col branding-col">
                    <p className="footer-brand-desc">
                        Sustainably crafted home textiles for your little ones.
                        Bringing comfort and care to every corner of your home.
                    </p>
                    <div className="social-links">
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Mail size={20} /></a>
                    </div>
                </div>

                <div className="footer-col links-col">
                    <h4>Shop</h4>
                    <a href="/collection">New Arrivals</a>
                    <a href="/collection">Best Sellers</a>
                    <a href="/collection">Gift Sets</a>
                    <a href="/collection">Accessories</a>
                </div>

                <div className="footer-col links-col">
                    <h4>Company</h4>
                    <a href="/story">Sustainability</a>
                    <a href="/contact">Contact Us</a>
                    <a href="/faqs">FAQs</a>
                </div>


            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Thuvaalai. Designed for Love.</p>
            </div>
        </footer>
    );
};

export default Footer;
