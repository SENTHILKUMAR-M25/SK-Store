import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import CartDraw from "./Components/CardDraw";
import Index from "./Components/Index";
import Products from "./Components/Products";
import ProductDetail from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import AuthModal from "./Components/AuthModal";

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ⏱ Auto show login modal if not logged in
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setShowAuthModal(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // ✅ Handle login/register
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name?.value || "Guest";
    const email = e.target.email.value;
    const userData = { name, email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowAuthModal(false);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        onAuthOpen={() => setShowAuthModal(true)} // renamed prop matches Header
        setIsLoginMode={setIsLoginMode}
        onLogout={handleLogout}
      />

      <CartDraw />

      <Routes>
        <Route
          path="/"
          element={<Index user={user} setShowAuthModal={setShowAuthModal} />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isLoginMode={isLoginMode}
        setIsLoginMode={setIsLoginMode}
        onSubmit={handleAuthSubmit}
      />

      <Footer />
    </>
  );
};

export default App;