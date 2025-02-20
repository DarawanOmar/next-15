import React from "react";
import { PanIcons } from "@/public/icons";
import { getAllFood } from "../_lib";
import Image from "next/image";
import FoodDropdown from "./dropdown-table";
import ChangeStatusFood from "./change-status-food";
import EmptyImage from "@/components/reusable/empty-image";

async function FeedFood({ searchParams }: { searchParams: searchParamsType }) {
  const page = Number((await searchParams).page) || 1;
  const category_id = Number((await searchParams).category) || 0;
  const allFood = await getAllFood(category_id as number, page);
  if (allFood.data?.length === 0) {
    return <EmptyImage />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-16">
      {allFood?.data?.map((food, index) => (
        <div
          key={index}
          className="bg-white dark:bg-white/5 dark:border p-5 rounded-xl drop-shadow-xl border relative flex flex-col justify-center items-center  transition-all duration-500 cursor-pointer "
        >
          <FoodDropdown food={food} />
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
          <div className="flex flex-col justify-center items-center gap5 mt-20">
            <p className="text-lg">{food.name_ku}</p>
            <div className="flex items-center gap-5">
              <div className="bg-primary10 dark:bg-white/5 dark:border text-primary rounded-md p-1 max-h-max max-w-max">
                <PanIcons height={20} width={20} />
              </div>{" "}
              <div className="flex items-center gap-1 text-lg  mt-2 text-softGray">
                <span>IQD</span>
                <p>{food.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <ChangeStatusFood id={food.food_id} sold_out={food.sold_out} />
        </div>
      ))}
    </div>
  );
}

export default FeedFood;
