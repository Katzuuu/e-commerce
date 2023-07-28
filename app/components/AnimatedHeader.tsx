"use client";

import { headerSlide } from "@/lib/animations";
import { motion } from "framer-motion";

const AnimatedHeader = ({ font }: any) => {
  return (
    <motion.h2
      variants={headerSlide}
      initial="initial"
      animate="show"
      className={`${font} text-4xl`}
    >
      All products
    </motion.h2>
  );
};

export default AnimatedHeader;
