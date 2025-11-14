import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import heroBanner from "../assets/hero-banner.jpg";
import categoryShirts from "../assets/category-shirts.jpg";
import categoryTrousers from "../assets/category-trousers.jpg";
import categoryTshirts from "../assets/category-tshirts.jpg";
import categorySuits from "../assets/category-suits.jpg";
import CategoryCard from "../Components/CategoryCard";

const Index = ({ user, setShowAuthModal }) => {
  const categories = [
    { name: "Shirts", image: categoryShirts, link: "/products?category=Shirts" },
    { name: "Trousers", image: categoryTrousers, link: "/products?category=Trousers" },
    { name: "T-Shirts", image: categoryTshirts, link: "/products?category=T-Shirts" },
    { name: "Suits", image: categorySuits, link: "/products?category=Suits" },
  ];

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setShowAuthModal(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [user, setShowAuthModal]);

  return (
    <main className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden">
        {/* Hero Background */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroBanner} alt="Hero" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Text Box with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-left text-white px-10 py-8 max-w-xl  shadow-xl"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
          >
            Elevate Your Style
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            Discover premium men's fashion crafted with elegance and perfection.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Link
              to="/products"
              className="px-8 py-3 rounded-lg font-semibold bg-white text-black shadow-lg 
              hover:bg-gray-200 transition-transform transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-background relative">
        {/* Soft Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Shop by Category
          </motion.h2>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="hover:scale-105 transition-transform"
              >
                <CategoryCard {...cat} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
