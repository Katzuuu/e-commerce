"use client";

import Link from "next/link";
import { CartContext } from "./CartContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { productAnim } from "@/lib/animations";
import { Toaster } from "react-hot-toast";
import PopupLogin from "./PopupLogin";
import UserPopup from "./UserPopup";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartProducts } = useContext<any>(CartContext);
  const menu = useRef(null);
  const icon = useRef(null);
  const text = useRef(null);
  const container = useRef(null);
  const { popUp, setPopUp }: any = useContext(CartContext);
  function removeDuplicates(arr: any) {
    let unique: any = [];
    arr.forEach((element: []) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique.length;
  }
  useEffect(() => {
    const closeMenu: any = (e: React.SyntheticEvent) => {
      if (
        e.target !== menu.current &&
        e.target !== icon.current &&
        e.target !== text.current &&
        e.target !== container.current
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", closeMenu);

    return () => document.body.removeEventListener("click", closeMenu);
  }, []);
  if (typeof window !== "undefined") {
    burgerIsOpen || popUp
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }
  return (
    <nav className="flex justify-between items-center padding h-14 text-white bg-customBlack">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#fff",
            color: "#222",
          },
          success: {
            duration: 3000,
          },
        }}
      />

      <div
        onClick={() => setPopUp(false)}
        className={`${
          popUp ? "bg-black pointer-events-auto" : ""
        } absolute right-0 left-0 top-0 bottom-0 z-10 pointer-events-none h-screen w-screen opacity-40 transition-all duration-700`}
      ></div>
      <AnimatePresence>
        {popUp && <PopupLogin setPopUp={setPopUp} />}
      </AnimatePresence>
      <Link className="text-lg" href={"/"}>
        Ecommerce.
      </Link>
      <ul className="xs:hidden md:flex items-center gap-2 sm:gap-6 text-customGray">
        <Link
          className={`link ${pathname === "/" ? "after:w-full" : "after:w-0"}`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`link ${
            pathname === "/product" ? "after:w-full" : "after:w-0"
          }`}
          href={"/product"}
        >
          All products
        </Link>
        <Link
          className={`link relative ${
            pathname === "/cart" ? "after:w-full" : "after:w-0"
          }`}
          href={"/cart"}
        >
          Cart
          <AnimatePresence>
            {removeDuplicates(cartProducts) > 0 && (
              <motion.div
                variants={productAnim}
                initial="initial"
                animate="show"
                exit="exit"
                className="absolute -top-1 -right-3 rounded-full w-4 h-4 text-xs flex items-center justify-center bg-customPurple text-white"
              >
                {removeDuplicates(cartProducts)}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <div className="relative">
          <button
            className=" z-20"
            onClick={() => setIsOpen(!isOpen)}
            ref={icon}
          >
            <AnimatePresence>
              {session?.user?.image ? (
                <motion.img
                  variants={productAnim}
                  initial="initial"
                  animate="show"
                  className="w-8 h-8 rounded-full pointer-events-none -mb-[6px]"
                  src={session?.user?.image as string}
                  alt="profile photo"
                />
              ) : (
                <motion.svg
                  variants={productAnim}
                  initial="initial"
                  animate="show"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isOpen ? "#5542F6" : "currentColor"}
                  className="w-8 h-8 pointer-events-none -mb-[6px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {isOpen && (
              <UserPopup
                session={session}
                menu={menu}
                text={text}
                container={container}
                setPopUp={setPopUp}
                setIsOpen={setIsOpen}
              />
            )}
          </AnimatePresence>
        </div>
      </ul>
      <div
        onClick={() => setBurgerIsOpen(!burgerIsOpen)}
        className="xs:flex flex-col gap-2 justify-center md:hidden h-10 w-10 z-50"
      >
        <div
          className={`w-full h-[3px] rounded-md origin-left transition-all duration-300 ${
            burgerIsOpen ? "bg-black rotate-45" : "bg-white"
          }`}
        ></div>
        <div
          className={`w-full h-[3px] rounded-md transition-all duration-300 ${
            burgerIsOpen ? "bg-black opacity-0" : "bg-white"
          }`}
        ></div>
        <div
          className={`w-full h-[3px] rounded-md origin-left transition-all duration-300 ${
            burgerIsOpen ? "bg-black -rotate-45 translate-y-[5px]" : "bg-white"
          }`}
        ></div>
      </div>
      <AnimatePresence>
        {burgerIsOpen && (
          <BurgerMenu setIsOpen={setBurgerIsOpen} session={session} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
