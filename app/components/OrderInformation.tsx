"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PaymentMethods from "../components/PaymentMethods";
import axios from "axios";

const OrderInformation = ({ orderInfo, setOrderInfo, font, session }: any) => {
  const [errorMsgs, setErrorMsgs] = useState<any>({});
  const validate = (values: any) => {
    const errors: any = {};
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    const postalCodeRegex = /^\d+$/;
    // phone validation
    if (orderInfo.phoneNumber.length < 10) {
      errors.phoneNumber = "Invalid phone number!";
    } else if (!phoneRegex.test(orderInfo.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number!";
    }
    // postal code validation
    if (orderInfo.postalCode.length !== 5) {
      errors.postalCode = "Invalid postal code!";
    } else if (!postalCodeRegex.test(orderInfo.postalCode)) {
      errors.postalCode = "Invalid postal code!";
    }
    // email validation
    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email!";
    }
    setErrorMsgs(errors);
    return errors;
  };
  const checkout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (Object.keys(validate(orderInfo)).length > 0) return;
    try {
      const { data } = await axios.post("/api/checkout", orderInfo);
      if (data.url) {
        window.location = data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkInputValues = () => {
    const emptyInputs = Object.values(orderInfo).filter(
      (value) => value === ""
    );
    if (emptyInputs.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="box lg:rounded-[10px]">
      <h2 className={`${font} text-3xl tracking-wide mb-5`}>
        Order Information
      </h2>
      <form onSubmit={checkout}>
        {!session?.user?.name ? (
          <input
            className="orderInput"
            type="text"
            placeholder="Name"
            required
            value={orderInfo.name}
            onChange={(e) =>
              setOrderInfo({ ...orderInfo, name: e.target.value })
            }
          />
        ) : (
          <input
            className="orderInput pointer-events-none text-[#9BA3AF]"
            type="text"
            placeholder="Name"
            required
            value={session.user.name}
            onChange={() =>
              setOrderInfo({ ...orderInfo, name: session.user?.name })
            }
          />
        )}
        {!session?.user?.email ? (
          <>
            <input
              required
              className="orderInput"
              type="text"
              placeholder="Email address"
              value={orderInfo.email}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, email: e.target.value })
              }
            />
            {errorMsgs.email && (
              <p className="text-red-500 mb-[6px] ml-2">{errorMsgs.email}</p>
            )}
          </>
        ) : (
          <input
            className="orderInput pointer-events-none text-[#9BA3AF]"
            type="text"
            placeholder="Name"
            required
            value={session.user.email}
            onChange={() =>
              setOrderInfo({ ...orderInfo, email: session.user?.email })
            }
          />
        )}
        <input
          required
          className="orderInput"
          type="text"
          placeholder="Phone number"
          value={orderInfo.phoneNumber}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, phoneNumber: e.target.value })
          }
        />
        {errorMsgs.phoneNumber && (
          <p className="text-red-500 mb-[6px] ml-2">{errorMsgs.phoneNumber}</p>
        )}
        <div className="flex gap-[6px]">
          <div className="flex-1">
            <input
              required
              className="orderInput"
              type="text"
              placeholder="City"
              value={orderInfo.city}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, city: e.target.value })
              }
            />
            <div></div>
          </div>
          <div className="flex-1">
            <input
              required
              className="orderInput"
              type="text"
              placeholder="Postal Code"
              value={orderInfo.postalCode}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, postalCode: e.target.value })
              }
            />
            {errorMsgs.postalCode && (
              <p className="text-red-500 mb-[6px] ml-2">
                {errorMsgs.postalCode}
              </p>
            )}
          </div>
        </div>
        <input
          required
          className="orderInput"
          type="text"
          placeholder="Street Address"
          value={orderInfo.streetAddress}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, streetAddress: e.target.value })
          }
        />
        <input
          required
          className="orderInput"
          type="text"
          placeholder="Country"
          value={orderInfo.country}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, country: e.target.value })
          }
        />
        <AnimatePresence>
          {checkInputValues() && (
            <PaymentMethods
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              font={font}
            />
          )}
        </AnimatePresence>
        <button
          type="submit"
          className="submit-btn w-full mt-3 transition-all duration-500"
        >
          {orderInfo.method === "Card payment"
            ? "Continue to payment"
            : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderInformation;
