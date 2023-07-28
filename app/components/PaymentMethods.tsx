import { header2, payment } from "@/lib/animations";
import { motion } from "framer-motion";
import visaMasterCardAmericanExpress from "@/public/assets/visaMasterCardAmericanExpress.png";

const PaymentMethods = ({ orderInfo, setOrderInfo, font }: any) => {
  return (
    <>
      <div className="overflow-hidden">
        <motion.h3
          variants={header2}
          initial="initial"
          animate="show"
          className={`${font} tracking-wider mt-2`}
        >
          Payment method
        </motion.h3>
      </div>
      <motion.ul
        variants={payment}
        initial="initial"
        animate="show"
        className="payment"
      >
        <li
          onClick={() => setOrderInfo({ ...orderInfo, method: "Card payment" })}
        >
          <div className="flex gap-2">
            <input
              readOnly
              checked={orderInfo.method === "Card payment" ? true : false}
              className=" pointer-events-none"
              type="checkbox"
            />
            <p>Credit card</p>
          </div>
          <img
            className="h-10"
            src={visaMasterCardAmericanExpress.src}
            alt=""
          />
        </li>
        <li
          onClick={() =>
            setOrderInfo({ ...orderInfo, method: "Cash on delivery" })
          }
        >
          <div className="flex gap-2">
            <input
              readOnly
              className="pointer-events-none"
              type="checkbox"
              checked={orderInfo.method === "Cash on delivery" ? true : false}
            />
            <p>Cash on delivery</p>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </li>
      </motion.ul>
    </>
  );
};

export default PaymentMethods;
