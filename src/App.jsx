import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Story from './pages/Story';
import Navbar from './components/Navbar';
import './App.css';

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <div className="app">
      <Navbar /> {/* Navbar stays persistent */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<><ScrollToTop /><Collection /></>} />
        <Route path="/story" element={<><ScrollToTop /><Story /></>} />
      </Routes>
    </div>
  );
}

export default App;
