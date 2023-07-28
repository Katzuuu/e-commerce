import axios from "axios";
import toast from "react-hot-toast";

const ShowComment = ({ data, user, reFetch }: any) => {
  const deleteComment = async () => {
    try {
      await axios.put("/api/comment", { id: data.comment._id });
      toast.success("Comment has been deleted!", {
        duration: 2000,
        position: "top-center",
        // Custom Icon
        icon: "❌",
      });
      reFetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {data && (
        <div className="relative grid grid-cols-1 gap-4 p-4 border w-full max-w-[672px] rounded-lg bg-white shadow-lg">
          {user?.email === data.user[0].email && (
            <svg
              onClick={deleteComment}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#9BA3AF"
              className="w-6 h-6 absolute top-3 right-3 cursor-pointer z-30 hover:stroke-red-600 transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          )}
          <div className="relative flex gap-4">
            <img
              src={data.user[0].image}
              className="relative  -top-8 -mb-4 bg-white border h-20 w-20 rounded-full"
              alt=""
              loading="lazy"
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <p className="relative text-black text-xl whitespace-nowrap truncate overflow-hidden">
                  {data.user[0].name}
                </p>
                <a className="text-gray-500 text-xl" href="#">
                  <i className="fa-solid fa-trash"></i>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                {new Date(data.comment.createdAt).toDateString()} at{" "}
                {new Date(data.comment.createdAt).toTimeString().slice(0, 5)}
              </p>
            </div>
          </div>
          <p className="-mt-4 text-gray-500">{data.comment.text}</p>
        </div>
      )}
      {data.length === 0 && <div className="text-white">No comments here</div>}
    </>
  );
};

export default ShowComment;
