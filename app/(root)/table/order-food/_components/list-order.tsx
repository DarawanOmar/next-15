import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import foodStore, {
  decreaseQty,
  increaseQty,
  removeFood,
} from "../../order-food-store";
import { useSnapshot } from "valtio";

function ListOrder() {
  const { selectedFood, totalPrice } = useSnapshot(foodStore);
  return (
    <div className="my-5">
      <p className="text-lg mb-5">لیستی داواکارییەکان</p>
      {selectedFood.length === 0 ? (
        <div className="text-center my-5 text-error">
          هیچ داواکاریەک تۆمارنەکراوە لە ئێستادا
        </div>
      ) : (
        selectedFood?.map((food, index) => (
          <div key={index} className="relative  p-3">
            <div className="flex justify-between items-center ">
              <div className="flex gap-4">
                <div>
                  <Image
                    src={
                      food.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${food.image}`
                        : "/logo.png"
                    }
                    alt={food.name}
                    width={60}
                    height={60}
                    className="rounded-full h-[60px] w-[60px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-3">
                  <p>{food.name}</p>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => increaseQty(food.food_id)}
                      type="button"
                      className="bg-primary text-white p-1  rounded-full"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                    <p>{food.addQuantity}</p>
                    <button
                      onClick={() => decreaseQty(food.food_id)}
                      type="button"
                      className="bg-primary text-white p-1  rounded-full"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-lg">
                <span>IQD</span>
                <p>{food.price.toLocaleString()}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFood(food.food_id)}
                className="absolute top-0 right-0 bg-table text-softGray p-1  rounded-full"
              >
                <X size={13} strokeWidth={3} />
              </button>
            </div>
            <Separator className="my-3" />
          </div>
        ))
      )}
      <div className="flex justify-between items-center">
        <p className="text-softGray">کۆی گشتی</p>
        <div className="flex items-center gap-1 text-lg">
          <span>IQD</span>
          <p>{totalPrice?.toLocaleString() ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
