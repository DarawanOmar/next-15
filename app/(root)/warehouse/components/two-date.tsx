import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

function TwoDate() {
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <div className="flex flex-wrap gap-2 items-center text-softGray">
        <p className="px-4 py-2 rounded-full dark:bg-black/5 dark:border  text-foreground ">
          2 دانە
        </p>
        لە بەرواری
        <p className="px-4 py-2 rounded-full dark:bg-black/5 dark:border  text-foreground ">
          20-2-2024
        </p>
        بەسەردەچێت
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-8 text-softGray">
        <p className="px-4 py-2 rounded-full dark:bg-black/5 dark:border  text-foreground ">
          2 دانە
        </p>
        لە بەرواری
        <p className="px-4 py-2 rounded-full dark:bg-black/5 dark:border  text-foreground ">
          20-2-2024
        </p>
        بەسەردەچێت
      </div>
    </div>
  );
}

export default TwoDate;

type Props = {
  data: Array<{
    quantity: number;
    expiration_date: string;
    fare_price_per_item: number;
  }>;
};

export function TwoDate2({ data }: Props) {
  return (
    <div className="py-6 flex flex-col justify-center items-center gap-5">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap gap-2 items-center text-softGray"
        >
          <p
            className={cn(
              "px-4 py-2 rounded-full bg-[#34C7591A] dark:bg-black/5 dark:border  text-foreground ",
              {
                "bg-primary15": index % 2 === 0,
              }
            )}
          >
            {item.quantity} دانە
          </p>
          لە بەرواری
          <p
            className={cn(
              "px-4 py-2 rounded-full bg-[#34C7591A] dark:bg-black/5 dark:border  text-foreground ",
              {
                "bg-primary15": index % 2 === 0,
              }
            )}
          >
            {format(new Date(item.expiration_date), "dd-MM-yyyy")}
          </p>
          بەسەردەچێت
        </div>
      ))}
    </div>
  );
}
