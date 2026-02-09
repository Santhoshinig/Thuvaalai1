import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Story from './pages/Story';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import './App.css';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/collection" element={<PageWrapper><ScrollToTop /><Collection /></PageWrapper>} />
          <Route path="/story" element={<PageWrapper><ScrollToTop /><Story /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><ScrollToTop /><Cart /></PageWrapper>} />
          <Route path="/favorites" element={<PageWrapper><ScrollToTop /><Favorites /></PageWrapper>} />
          <Route path="/product/:id" element={<PageWrapper><ScrollToTop /><ProductDetail /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
