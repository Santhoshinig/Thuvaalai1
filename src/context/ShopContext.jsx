import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import Toast from '../components/Toast';
import { AnimatePresence } from 'framer-motion';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
    }, []);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('thuvaalai_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('thuvaalai_favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('thuvaalai_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('thuvaalai_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        showToast(`${product.name} added to basket!`);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const toggleFavorite = (product) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.find(item => item.id === product.id);
            if (isFavorite) {
                showToast(`Removed ${product.name} from wishlist.`);
                return prevFavorites.filter(item => item.id !== product.id);
            }
            showToast(`Added ${product.name} to wishlist!`);
            return [...prevFavorites, product];
        });
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const cartTotal = cart.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        return total + price * item.quantity;
    }, 0);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <ShopContext.Provider value={{
            cart,
            favorites,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleFavorite,
            isFavorite,
            cartTotal,
            cartCount,
            showToast
        }}>
            {children}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </ShopContext.Provider>
    );
};
