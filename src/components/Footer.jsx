import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-premium">
            <div className="container footer-content">


                <div className="footer-col links-col">
                    <h4>Shop</h4>
                    <a href="#">New Arrivals</a>
                    <a href="#">Best Sellers</a>
                    <a href="#">Gift Sets</a>
                    <a href="#">Accessories</a>
                </div>

                <div className="footer-col links-col">
                    <h4>Company</h4>
                    <a href="#">Sustainability</a>
                    <a href="#">Contact Us</a>
                    <a href="#">FAQs</a>
                </div>


            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Thuvaalai. Designed for Love.</p>
            </div>
        </footer>
    );
};

export default Footer;
