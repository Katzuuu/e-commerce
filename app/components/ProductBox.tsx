"use client";

import Link from "next/link";
import { data } from "@/types/data";
import { Anton } from "next/font/google";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const anton = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const ProductBox = ({
  product,
  parentAnimation,
  textAnimation,
}: {
  product: data;
  parentAnimation?: any;
  textAnimation?: any;
}) => {
  const { addProduct }: any = useContext(CartContext);
  const message = (text: string) =>
    toast.success(text, {
      duration: 2000,
      position: "top-center",
      // Custom Icon
      icon: "✅",
    });
  return (
    <motion.div variants={parentAnimation} initial="initial" animate="show">
      <Link href={"/product/" + product._id}>
        <div className="bg-white p-5 h-[200px] text-center rounded-lg">
          <img
            className="w-full h-full object-contain"
            src={product.images[0]}
            alt="product"
          />
        </div>
      </Link>
      <motion.div variants={textAnimation} initial="initial" animate="show">
        <h2 className="m-0 text-base">{product.title}</h2>
        <div className="flex justify-between items-center">
          <p
            className={`${anton.className} tracking-wider text-[28px] font-bold`}
          >
            {product.price}€
          </p>
          <button
            onClick={() => {
              addProduct(product._id);
              message(`${product.title} is in cart!`);
            }}
            className="hover:bg-customPurple hover:text-white transition-all btn bg-transparent text-customPurple outline outline-1 outline-customPurple inline-flex items-center gap-2"
          >
            Add to cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductBox;
