import React, { useState, useContext, createContext } from 'react';

const CartContext = createContext(null);

//用法
//   import { useCart } from '../Context/CartProvider';
//   const { cartTotal, setCartTotal } = useCart();

export const CartProvider = ({ children }) => {
  //購物車總數
  const [cartTotal, setCartTotal] = useState(0);
  //購物車完整內容
  const [cartContents, setCartContents] = useState({});
  //選擇前往結帳的SID
  const [chooseedPayShop, setChooseedPayShop] = useState(0);
  //選擇前往結帳的商店內容
  const [chooseedPayShopContents, setChooseedPayShopContents] = useState({});

  // const [setAddr]

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        setCartTotal,
        cartContents,
        setCartContents,
        chooseedPayShop,
        setChooseedPayShop,
        chooseedPayShopContents,
        setChooseedPayShopContents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
