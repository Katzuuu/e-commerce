"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { container3, productAnim } from "@/lib/animations";

const ImagePreview = ({
  images,
}: {
  images: [string, string, string, string];
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  return (
    <motion.div
      variants={container3}
      initial="initial"
      animate="show"
      className="bg-white py-4 px-8 rounded-md gap-7 h-full xs:h-[calc(100vh-400px)] md:h-3/5 w-full flex flex-col min-w-[400px]"
    >
      <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
        {images?.map((img, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${img})`,
              opacity: activeImgIndex === index ? "1" : "0",
              transform: `translateX(${
                activeImgIndex === index ? "0%" : "-100%"
              })`,
            }}
            className="absolute w-full h-full bg-center bg-contain bg-no-repeat transition-all duration-500"
          ></div>
        ))}
      </div>
      <div className="flex justify-center h-1/4 gap-4 items-center">
        {images?.map((img, index) => (
          <motion.img
            variants={productAnim}
            key={index}
            loading="lazy"
            className={`miniImg cursor-pointer ${
              activeImgIndex === index ? "activeBorder" : ""
            } h-full object-contain`}
            src={img}
            onClick={() => setActiveImgIndex(index)}
            alt="product"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImagePreview;
