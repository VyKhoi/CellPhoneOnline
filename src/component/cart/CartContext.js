import React, { useState, useEffect, useContext } from "react";

const CartContext = React.createContext([]);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(
      cartItems.filter((item) => item.productColorId !== productId)
    );
  };

  const values = { cartItems, addToCart, removeFromCart, setCartItems }; // Add setCartItems to context

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartContext;
