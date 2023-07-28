"use client";

import { Anton } from "next/font/google";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { container2, header } from "@/lib/animations";
import OrderInformation from "../components/OrderInformation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const anton = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [noItems, setNoItems] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
    selectedProducts: "",
    method: "Card payment",
  });
  const router = useRouter();
  const fetchCartProducts = async () => {
    setOrderInfo({ ...orderInfo, selectedProducts: cartProducts });
    try {
      if (cartProducts.length > 0) {
        const { data } = await axios.post("/api/cart", { ids: cartProducts });
        setProducts(data);
        setNoItems(false);
      } else {
        setNoItems(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCartProducts();
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.location.href.includes("success")) {
        clearCart();
      }
    }
    if (session) {
      setOrderInfo((prev) => {
        return {
          ...prev,
          name: session.user?.name,
          email: session.user?.email,
        };
      });
    }
  }, [session]);
  const productQunatity = (type, productId) => {
    if (type === "increase") {
      addProduct(productId);
    }
    if (type === "decrease") {
      if (cartProducts.filter((id) => id === productId).length === 1) {
        return;
      }
      removeProduct(productId);
    }
  };
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((product) => product._id === productId)?.price;
    total += price;
  }
  const removeAll = (productId) => {
    setProducts(() => {
      const updated = products.filter((product) => product._id !== productId);
      return [...updated];
    });
    removeProduct(productId, "all");
  };
  if (typeof window !== "undefined") {
    if (window.location.href.includes("success")) {
      return (
        <div className="padding py-[30px]">
          <div className="m-auto box lg:w-1/2 text-center">
            <h1 className="font-bold xs:text-3xl lg:text-4xl mb-3">
              Thanks for your order!
            </h1>
            <p className="lg:text-base xs:text-sm">
              We will email you when your order will be sent.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-3 submit-btn"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="lg:grid lg:gap-10 lg:grid-cols-cart xs:px-0 lg:px-24 xl:px-32 lg:py-[30px]">
      <div className="box lg:rounded-[10px]">
        <div className="flex items-center gap-5">
          <h2 className={`${anton.className} text-3xl tracking-wide`}>Cart</h2>
          {!noItems && products.length <= 0 && (
            <PulseLoader color="#222" size={10} />
          )}
        </div>
        <AnimatePresence>
          {!!products.length && total && (
            <>
              <motion.div
                variants={container2}
                initial="initial"
                animate="show"
                className="mt-5 overflow-hidden"
              >
                {products.length > 0 &&
                  products?.map((product) => (
                    <div
                      className="flex justify-between items-center mb-6"
                      key={product._id}
                    >
                      <div className="flex items-center">
                        <Link href={`/product/${product._id}`}>
                          <img
                            className=" h-24 w-[150px] object-contain"
                            src={product.images[0]}
                            alt="product"
                          />
                        </Link>
                        <div className="lg:ml-6">
                          <h3 className="font-bold xs:text-xs lg:text-sm">
                            {product.title}
                          </h3>
                          <div>
                            <p className="xs:text-xs lg:text-base">
                              quantity:{" "}
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </p>
                            <button
                              onClick={() =>
                                productQunatity("increase", product._id)
                              }
                              className="mr-[1px] active:scale-90 transition-all"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                productQunatity("decrease", product._id)
                              }
                              className="active:scale-90 transition-all"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center xs:gap-2 lg:gap-16">
                        <p className={`${anton.className} text-xl`}>
                          {product.price *
                            cartProducts.filter((id) => id === product._id)
                              .length}
                          €
                        </p>
                        <button
                          onClick={() => removeAll(product._id)}
                          className=" text-right lg:mr-14 btn text-white bg-black shadow-md hover:shadow-xl hover:scale-95 transition-all"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <div className="bg-[#eee] w-full h-[2px] rounded-lg"></div>
                <div className="flex justify-end items-center text-right mt-6 gap-4">
                  <span className=" font-bold">Total</span>
                  <p
                    className={`text-3xl ${anton.className} inline-block py-1 px-2 border-black border-2 `}
                  >
                    {total}€
                  </p>
                </div>
              </motion.div>
            </>
          )}
          {noItems && (
            <div className="overflow-hidden">
              <motion.div
                variants={header}
                initial="initial"
                animate="show"
                className="mt-[20px]"
              >
                Your cart is empty!
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      {!!cartProducts?.length && (
        <OrderInformation
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          font={anton.className}
          session={session}
        />
      )}
    </div>
  );
};

export default CartPage;
