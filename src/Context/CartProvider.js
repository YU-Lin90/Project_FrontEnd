import React, { useState, useContext, createContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState({});

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        setCartTotal,
        setCart,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
