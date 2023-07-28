"use client";

import { Poppins } from "next/font/google";
import { data } from "@/types/data";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Anton } from "next/font/google";
import { useContext } from "react";
import { CartContext } from "@/app/components/CartContext";
import axios from "axios";
import ImagePreview from "@/app/components/ImagePreview";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  container2,
  header,
  scaleDown,
  show2,
  slideRight,
} from "@/lib/animations";
import CommentSection from "@/app/components/CommentSection";

const anton = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const detailPage = () => {
  const [currentProduct, setCurrentProduct] = useState<data>();
  const { addProduct } = useContext(CartContext);
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const id = splittedPathname[2];
  const getCurrentProduct = async () => {
    try {
      const { data } = await axios.post("/api/cart", { ids: id });
      setCurrentProduct(data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCurrentProduct();
  }, []);
  const message = (text: string) =>
    toast.success(text, {
      duration: 2000,
      position: "top-center",
      // Custom Icon
      icon: "✅",
    });
  return (
    <>
      {currentProduct && (
        <motion.div
          variants={container2}
          initial="initial"
          animate="show"
          className="padding overflow-hidden w-full md:w-2/3 lg:w-full mx-auto my-auto py-[30px] flex lg:flex-row flex-col items-center justify-center gap-8 md:gap-[60px] lg:gap-[100px] sm:h-[200%] md:h-[calc(100vh-78px)] lg:h-[calc(100vh-88px)]"
        >
          <ImagePreview images={currentProduct.images} />
          <div className="flex flex-col gap-6 justify-center pr-0 xl:pr-32">
            <div className="overflow-hidden pb-1">
              <motion.h2
                variants={header}
                className={`${poppins.className} text-2xl lg:text-4xl`}
              >
                {currentProduct.title}
              </motion.h2>
            </div>
            <motion.p className="text-sm lg:text-base" variants={show2}>
              {currentProduct.description}
            </motion.p>
            <div className="flex gap-6 items-center">
              <motion.p
                variants={slideRight}
                className={`${anton.className} tracking-wider text-[15px] lg:text-[30px] font-bold`}
              >
                {currentProduct.price}€
              </motion.p>
              <motion.button
                variants={scaleDown}
                onClick={() => {
                  addProduct(currentProduct._id);
                  message(`${currentProduct.title} is in cart!`);
                }}
                className="hover:bg-customPurple hover:text-white transition-colors btn bg-transparent text-customPurple outline outline-1 outline-customPurple inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <span>Add to cart</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      <CommentSection productId={currentProduct?._id} font={anton.className} />
    </>
  );
};

export default detailPage;
