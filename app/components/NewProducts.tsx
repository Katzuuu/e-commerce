"use client";

import { arrayOfProducts } from "@/types/data";
import ProductBox from "./ProductBox";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { container } from "@/lib/animations";
import { slideUp, show } from "@/lib/animations";

const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const NewProducts = ({ data }: { data: arrayOfProducts }) => {
  return (
    <section className="padding py-[30px] overflow-hidden">
      <h2 className={`${poppins.className} text-4xl`}>New Arrivals</h2>
      <motion.div
        variants={container}
        initial="initial"
        animate="show"
        className="productsGrid 2xl:grid-cols-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {data?.map((product) => (
          <ProductBox
            key={product._id}
            parentAnimation={slideUp}
            textAnimation={show}
            product={product}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default NewProducts;
