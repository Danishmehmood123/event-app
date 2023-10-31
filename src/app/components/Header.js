"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { favorites } = useSelector((state) => state.event);
  const [showModel, setShowModel] = useState(false);
  return (
    <>
      <div className="w-full bg-navbar py-2 text-white flex items-center justify-around">
        <span className="kanit font-bold text-3xl">Events</span>
        <div className="flex gap-5">
          <div
            onClick={() => setShowModel(true)}
            className="relative cursor-pointer"
          >
            <div className="absolute bg-black flex justify-center items-center rounded-full h-5 w-5 -top-3 -right-2">
              <span className="text-white"> {favorites.length}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464Zm6.826 1.641a3.998 3.998 0 0 0-5.49-.153l-1.335 1.198l-1.336-1.197a4 4 0 0 0-5.686 5.605L12 18.654l7.02-7.03a4 4 0 0 0-.193-5.454Z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 22a8 8 0 1 1 16 0H4Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6Z"
            />
          </svg>
        </div>
      </div>
      {favorites.length > 0 && showModel && (
        <div
          onClick={() => setShowModel(false)}
          className="transition-all ease-in duration-300 w-full h-screen fixed flex items-center justify-center inset-0 backdrop-blur-2xl z-10"
        >
          <div
            className={`${
              showModel && "scale-up"
            } transition-all translate-x-full ease-in-out duration-500  h-max p-5 w-full bg-[#6d52e7] text-white max-w-[600px] mx-auto z-20`}
          >
            {favorites.map((favorite, ind) => {
              return (
                <div key={ind} className="flex">
                  <div className="w-full items-center flex gap-3">
                    <p className="font-bold text-xl">category</p>
                    <p>{favorite.category}</p>
                  </div>
                  <div className="w-full flex justify-start items-center gap-3">
                    <p className=" font-bold text-xl">Country</p>
                    <p>{favorite.country}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
