import React from "react";
import Image from "next/image";
import { getAllFood } from "@/app/(root)/foods/_lib";
import OrderButton from "./button-order";

type Props = {
  category_id: number;
};

async function FeedFood({ category_id }: Props) {
  const allFoods = await getAllFood(category_id, 1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-14">
      {allFoods?.data?.map((food, index) => (
        <div
          key={index}
          className="bg-white dark:bg-white/5 dark:border p-5 rounded-xl drop-shadow-xl border relative flex flex-col justify-center items-center  transition-all duration-500 cursor-pointer"
        >
          <div className="absolute -top-8 mx-auto">
            <Image
              src={
                food.image
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${food.image}`
                  : "/logo.png"
              }
              alt={food.name_ku}
              width={120}
              height={120}
              className="rounded-full border-4 object-cover h-[120px] w-[120px] "
            />
          </div>
          <div className="flex flex-col justify-center items-center gap5 mt-[80px]">
            <p className="text-lg">{food.name_ku}</p>
            <div className="flex items-center gap-1 text-xl font-sirwan_meduim mt-2">
              <span>IQD</span>
              <p>{food.price.toLocaleString()}</p>
            </div>
          </div>
          <OrderButton food={food} />
        </div>
      ))}
    </div>
  );
}

export default FeedFood;
