"use client";

import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ShowComment from "./ShowComment";
import { motion } from "framer-motion";
import { commentSection } from "@/lib/animations";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

const CommentSection = ({ productId, font }: any) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { data: session } = useSession();
  const { setPopUp }: any = useContext(CartContext);

  const validate = (value: any) => {
    let msg = "";
    if (value.length < 5) {
      msg = "Minimal length 5 characters!";
    } else if (value.length > 150) {
      msg = "Too much characters!";
    }
    setErrMsg(msg);
    return msg;
  };

  const fetchComments = async () => {
    if (!productId) return;
    try {
      const { data } = await axios.get("/api/comment");
      setComments(
        data.filter((prop: any) => prop.comment.product === productId)
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [productId]);
  const addComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!session) {
      window.scrollTo(0, 0);
      setPopUp(true);
      return;
    }
    if (validate(commentText)) return;
    setErrMsg("");
    toast.success("Posted successfully", {
      duration: 2000,
      position: "top-center",
      // Custom Icon
      icon: "✅",
    });
    const data = {
      id: session.user?.id || session.user?.email,
      productId,
      commentText,
    };
    try {
      await axios.post("/api/comment", data);

      fetchComments();
    } catch (err) {
      console.log(err);
    }
    setCommentText("");
  };
  return (
    <motion.div
      variants={commentSection}
      initial="initial"
      animate="show"
      className="w-full h-screen bg-customBlack text-white pattern relative mt-6 padding py-8"
    >
      <h1
        className={`${font} tracking-wider md:text-5xl mt-10 text-left mb-14 xs:text-3xl`}
      >
        Comment Section
      </h1>
      <div
        className={`w-full h-3/4 pb-60 flex flex-col sc items-center gap-32 bg-transparent p-4 ${
          comments.length === 0 ? "" : "overflow-y-scroll"
        }`}
      >
        <div className="flex items-center justify-center shadow-lg max-w-2xl mt-16">
          <form
            onSubmit={addComment}
            className="w-full max-w-2xl bg-white rounded-lg px-4 pt-2"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Add a new comment
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 text-black rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText}
                  required
                ></textarea>
              </div>
              <div className="w-full flex items-start md:w-full px-3">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                  <svg
                    fill="none"
                    className="w-5 h-5 text-gray-600 mr-1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs md:text-sm pt-px">
                      Between 5 - 150 characters <br />
                    </p>
                    {errMsg && (
                      <p className="underline text-red-600 text-xs md:text-sm pt-px">
                        {errMsg}
                      </p>
                    )}
                  </div>
                </div>
                <div className="-mr-1">
                  <input
                    type="submit"
                    className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    value="Post Comment"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {comments.length > 0 &&
          comments.map((comment: any) => (
            <ShowComment
              key={comment.comment._id}
              data={comment}
              user={session?.user}
              reFetch={fetchComments}
            />
          ))}
        {comments.length === 0 && <div>No comments here!</div>}
      </div>
    </motion.div>
  );
};

export default CommentSection;
