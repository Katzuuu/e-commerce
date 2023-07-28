"use client";

import { data } from "@/types/data";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Link from "next/link";

const Featured = ({ data }: { data: data }) => {
  const { addProduct }: any = useContext(CartContext);
  return (
    <section className="relative padding py-8 h-[350px] bg-customBlack flex xs:flex-col lg:flex-row items-center justify-between overflow-hidden">
      <article className="flex-1 flex flex-col gap-6 z-10">
        <h2 className=" xs:text-4xl lg:text-6xl text-white">{data.title}</h2>
        <p className="lg:text-md xs:text-sm xs:text-white lg:text-customGray w-2/3">
          {data.description}
        </p>
        <div className=" flex items-center gap-4">
          <Link
            href={"/product/" + data._id}
            className="btn hover:bg-white hover:text-black transition-all hover:outline-black bg-transparent text-white outline outline-1 outline-white"
          >
            Read more
          </Link>
          <button
            onClick={() => addProduct(data._id)}
            className="btn hover:bg-white hover:text-customPurple transition-all bg-customPurple text-white outline outline-1 outline-customPurple inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>

            <span>Add to cart</span>
          </button>
        </div>
      </article>
      <div className="h-full flex-1">
        <img
          src={data.images[0]}
          alt="macbook"
          className="xs:hidden lg:block h-full w-full object-contain xs:absolute xs:-top-8 xs:-right-32 lg:static pointer-events-none"
        />
        <img
          src={data.images[2]}
          alt="macbook"
          className="xs:block lg:hidden h-full w-full object-contain xs:absolute xs:top-0 xs:-right-32 lg:static pointer-events-none"
        />
      </div>
    </section>
  );
};

export default Featured;
