import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../Components/CartContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to switch color theme
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shirts", path: "/products?category=Shirts" },
    { name: "Trousers", path: "/products?category=Trousers" },
    { name: "T-Shirts", path: "/products?category=T-Shirts" },
    { name: "Suits", path: "/products?category=Suits" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path.startsWith("/products")) {
      const params = new URLSearchParams(path.split("?")[1]);
      const category = params.get("category");
      return (
        location.pathname === "/products" &&
        new URLSearchParams(location.search).get("category") === category
      );
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
        isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tight transition-colors ${
            isScrolled ? "text-black" : "text-amber-400"
          }`}
        >
          MenStyle
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? isScrolled
                      ? "text-amber-600"
                      : "text-yellow-300"
                    : isScrolled
                    ? "text-gray-800 hover:text-amber-600"
                    : "text-gray-200 hover:text-yellow-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            className={`relative p-2 rounded-md transition-colors ${
              isScrolled
                ? "text-black hover:bg-amber-100/40"
                : "text-white hover:bg-amber-400/20"
            }`}
            onClick={openCart}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? "text-black hover:bg-amber-100/40"
                : "text-white hover:bg-amber-400/20"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden overflow-hidden backdrop-blur-md transition-colors ${
              isScrolled ? "bg-white/90" : "bg-black/70"
            }`}
          >
            <ul className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? isScrolled
                          ? "text-amber-600"
                          : "text-yellow-300"
                        : isScrolled
                        ? "text-gray-800 hover:text-amber-600"
                        : "text-gray-200 hover:text-yellow-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
