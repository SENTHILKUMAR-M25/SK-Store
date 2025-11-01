import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Truck, Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "./CartContext";
import { products } from "./product";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ✅ Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Validation before add/buy
  const validateSelections = () => {
    if (!selectedSize && !selectedColor) {
      toast.warning("⚠️ Please select a size and color before continuing!");
      return false;
    }
    if (!selectedSize) {
      toast.warning("⚠️ Please select a size first!");
      return false;
    }
    if (!selectedColor) {
      toast.warning("⚠️ Please select a color first!");
      return false;
    }
    if (quantity < 1) {
      toast.warning("⚠️ Quantity must be at least 1!");
      return false;
    }
    return true;
  };

  // ✅ Add to cart
  const handleAddToCart = () => {
    if (!validateSelections()) return;
    const item = { ...product, selectedSize, selectedColor, quantity };
    addToCart(item);
    toast.success(`🛒 ${product.name} added to your cart!`);
  };

  // ✅ Buy now
  const handleBuyNow = () => {
    if (!validateSelections()) return;
    const item = { ...product, selectedSize, selectedColor, quantity };
    addToCart(item);
    toast.success("✅ Proceeding to checkout...");
    setTimeout(() => navigate("/checkout"), 400);
  };

  return (
    <main className="min-h-screen py-12 relative">
      {/* ✅ Fixed Back Button */}
      <div className="fixed top-18 left-4 z-50">
        <Link
          to="/products"
          className="inline-flex items-center bg-black text-white px-4 py-2 shadow-md hover:bg-gray-800 transition rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4 " />
        
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-3/4 bg-secondary rounded-sm overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {product.discountPrice && (
              <div className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-sm">
                SALE
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-black"
                          : "fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold">
                    ${product.discountPrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size */}
            <div>
              <p className="font-medium mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-sm transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="font-medium mb-3">Select Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-sm transition-colors ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-medium mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded-sm hover:border-black"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded-sm hover:border-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="flex-1 border border-gray-300 text-black px-6 py-3 rounded-sm hover:border-black transition"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% protected</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
