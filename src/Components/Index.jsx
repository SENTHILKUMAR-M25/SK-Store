import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "../assets/hero-banner.jpg";
import categoryShirts from "../assets/category-shirts.jpg";
import categoryTrousers from "../assets/category-trousers.jpg";
import categoryTshirts from "../assets/category-tshirts.jpg";
import categorySuits from "../assets/category-suits.jpg";
import CategoryCard from "../Components/CategoryCard";

const Index = () => {
  const categories = [
    { name: "Shirts", image: categoryShirts, link: "/products?category=Shirts" },
    { name: "Trousers", image: categoryTrousers, link: "/products?category=Trousers" },
    { name: "T-Shirts", image: categoryTshirts, link: "/products?category=T-Shirts" },
    { name: "Suits", image: categorySuits, link: "/products?category=Suits" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroBanner}
            alt="Men's fashion hero"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your Style
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
              Discover premium men's fashion. Curated collections of elegant shirts, trousers, t-shirts, and suits.
            </p>

            {/* Replaced Button with Styled Link */}
            <Link
              to="/products"
              className="inline-block bg-white text-black font-semibold text-lg px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed for the modern gentleman.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
                link={category.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
