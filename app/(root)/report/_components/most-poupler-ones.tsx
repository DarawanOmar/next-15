import Image from "next/image";
import React from "react";
import { Report } from "../_lib";

function MostPoupulerOnes({ report }: { report: Report | undefined }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-16 my-14">
      {report?.most_order?.slice(0, 5).map((food, index) => (
        <div
          key={food.food_id}
          className="bg-white dark:bg-white/5 dark:border p-5 rounded-3xl drop-shadow-xl border relative flex flex-col justify-center items-center hover:scale-105 transition-all duration-500 cursor-pointer"
        >
          <div className="absolute -top-8 mx-auto">
            <Image
              src={
                food.image
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${food.image}`
                  : "/logo.png"
              }
              alt={food.food_name}
              width={105}
              height={105}
              className="rounded-full border-4 object-cover h-[105px] w-[105px] "
            />
          </div>
          <div className="flex flex-col justify-center items-center gap5 mt-16">
            <p className="text-lg">{food.food_name}</p>
            <p className="text-softGray text-lg">{food.quantity} داواکراوە</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MostPoupulerOnes;
