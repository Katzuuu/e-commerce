"use client";

import { container5, frame } from "@/lib/animations";
import { motion } from "framer-motion";

const ProductsAnim = () => {
  return (
    <motion.div
      className="z-10"
      variants={container5}
      initial="initial"
      animate="show"
    >
      <motion.div
        variants={frame}
        className="frame bg-[#222] z-[3]"
      ></motion.div>
      <motion.div
        variants={frame}
        className="frame bg-customGray z-[2]"
      ></motion.div>
      <motion.div
        variants={frame}
        className="frame bg-customPurple z-[1]"
      ></motion.div>
    </motion.div>
  );
};

export default ProductsAnim;
