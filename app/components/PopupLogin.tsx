"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loginChildren, loginContainer } from "@/lib/animations";
import Lottie from "lottie-react";
import animationData from "@/public/assets/loginAnimation.json";
import { Poppins } from "next/font/google";
import { signIn } from "next-auth/react";
import axios from "axios";
import { errors } from "@/types/errors";

const poppins = Poppins({
  weight: ["700", "400"],
  subsets: ["latin"],
  style: ["normal"],
});

const PopupLogin = ({ setPopUp }: { setPopUp: any }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    value: "",
    type: "",
  });
  const [userDataErrors, setUserDataErrors] = useState<errors>({});
  const [seePassword, setSeePassword] = useState(false);
  const [register, setRegister] = useState(false);

  const validate = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const errors: errors = {};
    const regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    // username validation
    if (values.username.length < 4 && register) {
      errors.username = "Username must be more than 3 characters!";
    } else if (values.username.length > 10) {
      errors.username = "Username can not have more than 10 characters!";
    }
    // email validation
    if (!regex.test(values.email)) {
      errors.email = "Invalid email format!";
    }
    // password validation
    if (values.password.length < 5) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 20) {
      errors.password = "Password can not have more than 20 characters!";
    }
    setMessage({ value: "", type: "" });
    setUserDataErrors(errors);
    return errors;
  };

  const registerOrSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (Object.keys(validate(userData)).length > 0) {
      return;
    }
    try {
      if (register) {
        await axios.post("/api/register", userData);
        setMessage({
          value: "Account was successfully created! Please Sign In.",
          type: "success",
        });
        setRegister(false);
      } else {
        await signIn("credentials", {
          ...userData,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            setMessage({ value: callback.error, type: "error" });
          } else {
            setPopUp(false);
          }
        });
      }
      setUserData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      setMessage({ value: err.response.data, type: "error" });
    }
  };
  return (
    <motion.div
      variants={loginContainer}
      initial="initial"
      animate="show"
      exit="exit"
      className="bg-white lg:pl-20 xs:w-full xs:h-full lg:rounded-lg lg:h-fit lg:w-fit absolute top-[50%] left-[50%] center z-50 flex p-5 text-black overflow-hidden"
    >
      <motion.form
        onSubmit={registerOrSignIn}
        variants={loginChildren}
        className="w-full lg:w-[50%]"
      >
        <h1
          className={`${poppins.className} mt-6 mb-2 cursor-default text-[#7742FF] text-4xl font-bold`}
        >
          {register ? "Register" : "Log In"}
        </h1>
        <p className="text-gray-400 mb-6">
          {register ? "Already have an account?" : "New to e-commerce?"}
          <span
            onClick={() => {
              setRegister(!register);
              setMessage({ value: "", type: "" });
            }}
            className="ml-2 underline cursor-pointer text-[#A17AFF] hover:text-[#7742FF]"
          >
            {register ? "Sign In here" : "Create an account"}
          </span>
        </p>
        <div className="flex items-center xs:gap-2 lg:gap-0 lg:justify-between mt-8">
          <button
            onClick={() => signIn("google")}
            className="font-semibold text-xs flex items-center justify-center gap-2 px-[15px] py-[5px] bg-white shadow-md rounded-md text-gray-400 hover:shadow-lg hover:scale-95 transition-all"
            type="button"
          >
            <svg
              width="24"
              height="25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.8 12.5a8.628 8.628 0 0 0-.212-2.05H12.2v3.723h5.51a4.913 4.913 0 0 1-2.044 3.255l-.019.125 2.969 2.307.205.02c1.889-1.75 2.978-4.325 2.978-7.38"
                fill="#4285F4"
              ></path>
              <path
                d="M12.2 22.31c2.7 0 4.966-.891 6.622-2.43l-3.156-2.452c-.844.59-1.978 1.003-3.466 1.003a6.006 6.006 0 0 1-3.516-1.162 6.039 6.039 0 0 1-2.173-3.007l-.117.01-3.087 2.397-.04.112a10.013 10.013 0 0 0 3.684 4.037A9.966 9.966 0 0 0 12.2 22.31"
                fill="#34A853"
              ></path>
              <path
                d="M6.51 14.26a6.196 6.196 0 0 1-.333-1.985 6.51 6.51 0 0 1 .322-1.984l-.006-.133L3.37 7.723l-.102.048a10.04 10.04 0 0 0 0 9.008l3.244-2.52Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12.2 6.123a5.532 5.532 0 0 1 3.866 1.493l2.823-2.764a9.59 9.59 0 0 0-6.69-2.61c-1.853 0-3.67.517-5.248 1.494a10.014 10.014 0 0 0-3.685 4.036l3.234 2.52a6.064 6.064 0 0 1 2.18-3.005 6.031 6.031 0 0 1 3.52-1.164Z"
                fill="#EB4335"
              ></path>
            </svg>
            <span>Continue with Google</span>
          </button>
          <button
            onClick={() => signIn("github")}
            className="text-white bg-black font-semibold text-xs flex items-center justify-center gap-2 px-[15px] py-[5px] shadow-md rounded-md hover:shadow-lg hover:scale-95 transition-all"
            type="button"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7001 0.599976C6.07349 0.599976 0.699997 5.95069 0.699997 12.5514C0.699997 17.8319 4.13839 22.3118 8.9064 23.8921C9.50612 24.0027 9.7263 23.6328 9.7263 23.3172C9.7263 23.0322 9.71517 22.0907 9.71001 21.0921C6.37157 21.815 5.66712 19.6819 5.66712 19.6819C5.12124 18.3005 4.33472 17.9332 4.33472 17.9332C3.24595 17.1914 4.41679 17.2067 4.41679 17.2067C5.62181 17.291 6.25631 18.4383 6.25631 18.4383C7.3266 20.2654 9.06358 19.7372 9.74836 19.4318C9.85606 18.6593 10.1671 18.1321 10.5102 17.8337C7.84485 17.5314 5.04295 16.5067 5.04295 11.9272C5.04295 10.6224 5.51172 9.55623 6.27936 8.71927C6.15477 8.41825 5.74402 7.20268 6.39561 5.55645C6.39561 5.55645 7.4033 5.23525 9.69649 6.78152C10.6537 6.51672 11.6803 6.38392 12.7001 6.37937C13.7199 6.38392 14.7473 6.51672 15.7063 6.78152C17.9967 5.23525 19.003 5.55645 19.003 5.55645C19.6562 7.20268 19.2452 8.41825 19.1206 8.71927C19.8901 9.55623 20.3557 10.6224 20.3557 11.9272C20.3557 16.5176 17.5484 17.5283 14.8762 17.8242C15.3067 18.195 15.6902 18.9224 15.6902 20.0374C15.6902 21.6365 15.6763 22.9235 15.6763 23.3172C15.6763 23.6352 15.8923 24.0079 16.5006 23.8905C21.266 22.3084 24.7 17.8301 24.7 12.5514C24.7 5.95069 19.3273 0.599976 12.7001 0.599976ZM5.19442 17.6251C5.16799 17.6844 5.0742 17.7022 4.98875 17.6615C4.90171 17.6225 4.85283 17.5415 4.88105 17.482C4.90688 17.4208 5.00087 17.4038 5.08771 17.4448C5.17495 17.4837 5.22463 17.5655 5.19442 17.6251ZM5.7847 18.1496C5.72747 18.2025 5.61559 18.1779 5.53968 18.0944C5.46119 18.0111 5.44648 17.8997 5.50451 17.846C5.56352 17.7932 5.67202 17.8179 5.75072 17.9012C5.82921 17.9855 5.84451 18.0962 5.7847 18.1496ZM6.18964 18.8208C6.11612 18.8716 5.9959 18.8239 5.92158 18.7176C5.84805 18.6114 5.84805 18.4839 5.92317 18.4329C5.99768 18.3818 6.11612 18.4277 6.19143 18.5332C6.26476 18.6413 6.26476 18.7687 6.18964 18.8208ZM6.8745 19.598C6.80872 19.6703 6.66863 19.6509 6.56609 19.5523C6.46117 19.4559 6.43196 19.3192 6.49793 19.247C6.5645 19.1745 6.70539 19.1949 6.80872 19.2927C6.91285 19.3889 6.94465 19.5266 6.8745 19.598ZM7.75961 19.8605C7.7306 19.9541 7.59567 19.9966 7.45974 19.9568C7.32402 19.9159 7.2352 19.8062 7.26262 19.7116C7.29084 19.6174 7.42636 19.5731 7.56328 19.6156C7.6988 19.6564 7.78783 19.7653 7.75961 19.8605ZM8.7669 19.9718C8.77028 20.0703 8.65502 20.1521 8.51234 20.1538C8.36887 20.157 8.25282 20.0772 8.25123 19.9803C8.25123 19.8807 8.3639 19.7998 8.50737 19.7974C8.65005 19.7946 8.7669 19.8738 8.7669 19.9718ZM9.75645 19.934C9.77354 20.0302 9.67438 20.1289 9.53269 20.1552C9.39339 20.1806 9.26443 20.1212 9.24674 20.0258C9.22945 19.9273 9.3304 19.8285 9.4695 19.803C9.61139 19.7784 9.73837 19.8362 9.75645 19.934Z"
                fill="white"
              ></path>
            </svg>
            <span>Continue with Github</span>
          </button>
        </div>
        <div className="flex items-center justify-center my-4 w-full">
          <div className="line"></div>
          <p className="p-2 text-[#A17AFF]">or</p>
          <div className="line"></div>
        </div>
        <div className="overflow-hidden">
          {message.value && (
            <p
              className={`${poppins.className} ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              } mb-6 underline`}
            >
              {message.value}
            </p>
          )}
        </div>
        {register && (
          <div className="inputBox">
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              type="text"
              required
            />
            <label className="basic">username</label>
            {userDataErrors.username && (
              <p className="userDataError">{userDataErrors.username}</p>
            )}
          </div>
        )}
        <div className="inputBox">
          <input
            type="text"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
          <label className="basic">e-mail</label>
          {userDataErrors.email && (
            <p className="userDataError">{userDataErrors.email}</p>
          )}
        </div>
        <div className="inputBox">
          {seePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#D1D5DA"
              className="w-6 h-6 eye"
              onClick={() => setSeePassword(!seePassword)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#D1D5DA"
              className="w-6 h-6 eye"
              onClick={() => setSeePassword(!seePassword)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
          <input
            type={seePassword ? "text" : "password"}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
            autoComplete="on"
          />
          <label className="password">password</label>
          {userDataErrors.password && (
            <p className="userDataError">{userDataErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#A17AFF] hover:bg-[#7742FF] border-2 border-[#7742FF] text-white rounded-md px-[15px] py-[5px] text-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          {register ? "Register" : "Sign In"}
        </button>
      </motion.form>
      <Lottie
        className="w-[800px] xs:hidden lg:block"
        animationData={animationData}
      />
      <svg
        onClick={() => setPopUp(false)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#A17AFF"
        className="w-12 h-12 absolute bottom-0 left-1/2 center hover:stroke-[#7742FF] down transition-all cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </motion.div>
  );
};

export default PopupLogin;
