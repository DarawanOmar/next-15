import Image from "next/image";
import React from "react";

function MostPoupulerOnes() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-16 my-14">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-white/5 dark:border p-5 rounded-3xl drop-shadow-xl border relative flex flex-col justify-center items-center hover:scale-105 transition-all duration-500 cursor-pointer"
        >
          <div className="absolute -top-8 mx-auto">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="rounded-full object-cover "
            />
          </div>
          <div className="flex flex-col justify-center items-center gap5 mt-16">
            <p className="text-lg">موقەبیلات</p>
            <p className="text-softGray text-lg">12 داواکراوە</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MostPoupulerOnes;
