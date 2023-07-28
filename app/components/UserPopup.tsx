"use client";

import { motion } from "framer-motion";
import { slideDown } from "@/lib/animations";
import { signOut } from "next-auth/react";

const UserPopup = ({
  session,
  menu,
  text,
  container,
  setPopUp,
  setIsOpen,
}: any) => {
  return (
    <motion.div
      variants={slideDown}
      initial="initial"
      animate="show"
      exit="exit"
      ref={menu}
      className="bubble inactive z-10 text-center center absolute sm:w-[180px] xl:w-[250px] sm:left-[30%] xl:left-[50%] -bottom-[155px] border-2 border-customBlack text-black bg-white rounded-md p-2"
    >
      <p ref={text} className="mb-2">
        {session ? `Welcome, ${session.user?.name}` : "You are not sign in!"}
      </p>
      <div ref={container}>
        <button
          onClick={() => {
            if (session) {
              return signOut();
            }
            setPopUp(true);
            setIsOpen(false);
          }}
          className="border-2 py-1 px-3 border-black hover:bg-black hover:text-white transition-all"
        >
          {session ? "Logout" : "Log In"}
        </button>
      </div>
    </motion.div>
  );
};

export default UserPopup;
