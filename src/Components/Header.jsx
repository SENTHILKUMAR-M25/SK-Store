import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "../Components/CartContext";
import { useEffect, useState, useRef } from "react";

const Header = ({ user, onAuthOpen, setIsLoginMode, onLogout }) => {
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧩 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const userInitial = user?.name?.charAt(0).toUpperCase();

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
          className={`text-2xl font-bold tracking-tight ${
            isScrolled ? "text-black" : "text-amber-400"
          }`}
        >
          MenStyle
        </Link>

        {/* Desktop Links */}
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

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            className={`relative p-2 rounded-md ${
              isScrolled
                ? "text-black hover:bg-amber-100/40"
                : "text-white hover:bg-amber-400/20"
            }`}
            onClick={openCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Click to Toggle */}
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`h-9 w-9 rounded-full flex items-center justify-center font-semibold transition ${
                  isScrolled
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {userInitial || <User className="h-4 w-4" />}
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md p-2 w-36">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-red-500"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setIsLoginMode(true);
                onAuthOpen();
              }}
              className={`text-sm font-medium rounded-md px-3 py-1.5 transition-colors ${
                isScrolled
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
            >
              Login / Register
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-md ${
              isScrolled
                ? "text-black hover:bg-amber-100/40"
                : "text-white hover:bg-amber-400/20"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;