import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Hworks from './components/Hworks';
import Features from './components/Features';
import Footer from './components/Footer';
import StEstimating from './components/StEstimating';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarOnRoutes = ['/StEstimating', '/login', '/register'];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const id = hash.replace('#', '');
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange(); // run on load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {!hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="landing"><LandingPage /></div>
              <div id="hworks"><Hworks /></div>
              <div id="features"><Features /></div>
              <Footer />
            </>
          }
        />
        <Route path="/StEstimating" element={<StEstimating />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
