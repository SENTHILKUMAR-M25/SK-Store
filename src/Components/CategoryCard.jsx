import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ name, image, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={link} className="group block">
        <div className="relative overflow-hidden aspect-3/4 rounded-sm">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
            <span className="text-sm text-white/90 group-hover:text-white transition-colors">
              Shop Now →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
