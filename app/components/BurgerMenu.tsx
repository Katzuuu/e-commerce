"use client";

import { burgerMenu, container4, header, show3 } from "@/lib/animations";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const poppins = Poppins({
  weight: ["700", "400"],
  style: ["normal"],
  subsets: ["latin"],
});

const BurgerMenu = ({ setIsOpen, session }: any) => {
  const pathname = usePathname();
  const { setPopUp, cartProducts }: any = useContext(CartContext);
  function removeDuplicates(arr: any) {
    let unique: any = [];
    arr.forEach((element: []) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique.length;
  }
  return (
    <motion.div
      variants={burgerMenu}
      initial="initial"
      animate="show"
      exit="exit"
      className="h-screen bg-white absolute top-0 bottom-0 left-0 right-0 z-40 overflow-hidden flex flex-col gap-6 items-center justify-center"
    >
      <svg
        className="absolute top-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#222222"
          fillOpacity="1"
          d="M0,128L60,106.7C120,85,240,43,360,37.3C480,32,600,64,720,69.3C840,75,960,53,1080,42.7C1200,32,1320,32,1380,32L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      {session && (
        <div className="flex gap-6 items-center -mt-8 mb-8">
          <img
            className="rounded-full border-2 border-[#222] w-16"
            src={session.user?.image}
            alt="profile picture"
          />
          <p className={` ${poppins.className} text-xl text-[#222]`}>
            {session.user?.name}
          </p>
        </div>
      )}
      <motion.ul
        variants={container4}
        initial="initial"
        animate="show"
        className={`${poppins.className} font-bold`}
      >
        <Link href={"/"}>
          <div className="overflow-hidden">
            <motion.li
              variants={header}
              onClick={() => setIsOpen(false)}
              className={` ${
                pathname === "/" ? "text-customPurple" : "text-[#222]"
              } burgerOption mb-3`}
            >
              Home
            </motion.li>
          </div>
        </Link>
        <Link href={"/product"}>
          <div className="overflow-hidden">
            <motion.li
              variants={header}
              onClick={() => setIsOpen(false)}
              className={` ${
                pathname === "/product" ? "text-customPurple" : "text-[#222]"
              } burgerOption mb-3`}
            >
              All products
            </motion.li>
          </div>
        </Link>
        <Link href={"/cart"}>
          <div className="overflow-hidden">
            <motion.li
              variants={header}
              onClick={() => setIsOpen(false)}
              className={` ${
                pathname === "/cart" ? "text-customPurple" : "text-[#222]"
              } burgerOption relative`}
            >
              Cart
              {removeDuplicates(cartProducts) > 0 && (
                <div className="absolute top-0 left-[68px] rounded-full w-4 h-4 text-xs flex items-center justify-center bg-customPurple text-white">
                  {removeDuplicates(cartProducts)}
                </div>
              )}
            </motion.li>
          </div>
        </Link>
      </motion.ul>
      <motion.button
        variants={show3}
        onClick={() => {
          if (session) {
            return signOut();
          }
          setIsOpen(false);
          setPopUp(true);
        }}
        className={` ${poppins.className} border-2 py-2 px-5 text-xl text-black border-black hover:bg-black hover:text-white transition-all`}
      >
        {session ? "Logout" : "Log In"}
      </motion.button>
      <svg
        className="absolute bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#222222"
          fillOpacity="1"
          d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,90.7C840,85,960,107,1080,96C1200,85,1320,43,1380,21.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default BurgerMenu;
