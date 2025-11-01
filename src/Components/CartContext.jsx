import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to Cart — supports both (item) and (product, size, color, qty)
  const addToCart = (product, size, color, quantity = 1) => {
    let newItem;

    // If only one argument (object-style call from ProductDetail)
    if (
      typeof product === "object" &&
      product.selectedSize &&
      product.selectedColor
    ) {
      newItem = product;
      size = product.selectedSize;
      color = product.selectedColor;
      quantity = product.quantity || 1;
    } else {
      // Standard (product, size, color, qty)
      newItem = { ...product, selectedSize: size, selectedColor: color, quantity };
    }

    if (!newItem?.id) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  // ✅ Remove item
  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  // ✅ Update quantity
  const updateQuantity = (id, size, color, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // ✅ Clear Cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ✅ Cart drawer control
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // ✅ Totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
