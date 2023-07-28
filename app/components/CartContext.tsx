"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      storage?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (storage && storage.getItem("cart")) {
      setCartProducts(JSON.parse(storage.getItem("cart") as string));
    }
  }, []);
  function addProduct(productId: string) {
    setCartProducts((prev: []) => [...prev, productId]);
  }
  function removeProduct(productId: string, type?: string) {
    if (type === "all") {
      const newArr = cartProducts.filter((id) => id !== productId);
      if (newArr.length === 0) {
        storage?.removeItem("cart");
      }
      setCartProducts(newArr);
      return;
    }
    setCartProducts((prev: any) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        if (cartProducts.length === 1) {
          storage?.removeItem("cart");
        }
        return prev.filter((value: any, index: any) => index !== pos);
      }
    });
  }
  function clearCart() {
    setCartProducts([]);
    storage?.removeItem("cart");
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        popUp,
        setPopUp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
