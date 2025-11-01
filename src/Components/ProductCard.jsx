import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../Components/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.sizeOptions[0], product.colorOptions[0], 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-3/4 bg-gray-100 rounded-sm mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.discountPrice && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-sm">
              SALE
            </div>
          )}
          {product.stockStatus === "Low Stock" && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-sm">
              Low Stock
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm group-hover:text-gray-500 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>

          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="font-semibold text-gray-900">
                  ${product.discountPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="font-semibold text-gray-900">${product.price}</span>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-800 rounded-md py-2 text-sm hover:bg-gray-100 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>

            {/* View Details button */}
            <Link
              to={`/product/${product.id}`}
              className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
