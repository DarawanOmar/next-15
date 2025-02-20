import React from "react";
import { Database, Desk, DownArrow, Meal } from "@/public/icons";
import { getReport, Report } from "../_lib";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function FeedCard() {
  const report = await getReport();
  const data = cardData(report.data || ({} as any));
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {data.map((data, index) => (
          <div
            key={index}
            className="grid gap-3 bg-background p-5 rounded-3xl drop-shadow-xl border hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <div className={`p-2 rounded-lg ${data.color}`}>
                <data.icon />
              </div>
              <p className="text-softGray text-lg">{data.title}</p>
            </div>
            <div className="flex font-sirwan_meduim text-3xl gap-1">
              {data.isIQD && <span>IQD</span>}
              <p>{data.price || 0}</p>
            </div>
            {data.bottom}
          </div>
        ))}
      </div>
      <Separator className="my-10" />
      <h1 className="text-softGray text-xl font-sirwan_meduim">
        زۆرترین خواستیان لەسەربووە
      </h1>
      {report?.data?.food_sale.length === 0 ? (
        <div className="text-center max-w-max mx-auto w-full text-error mt-10">
          هیچ داواکاریەک نییە لە ئەمڕۆدا
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-16 my-14">
          {report?.data?.food_sale?.map((food, index) => (
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
                <p className="text-softGray text-lg">
                  {food.quantity} داواکراوە
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FeedCard;

const cardData = (data: Report) => [
  {
    icon: Database,
    title: "فرۆشتنی ئەمڕۆ",
    price: data?.today_sale?.toLocaleString(),
    percentage: "-20%",
    percentageColor: "text-error",
    color: "bg-blueSoft text-blue",
    isIQD: true,
    bottom: (
      <div className="flex gap-2 text-sm ">
        <DownArrow />
        <span>{data?.compare_to_yestrday_sale?.toLocaleString()}</span>
        <p className="text-softGray">بەراورد بە دوێنێ</p>
      </div>
    ),
  },
  {
    icon: Desk,
    title: "مێز لە نانخواردندایە",
    price: data?.taken_table,
    percentage: "-10%",
    percentageColor: "text-warning",
    color: "bg-primary10 text-primary",
    isIQD: false,
    bottom: (
      <div className="flex gap-2 text-sm ">
        <span>{data?.available_table}</span>
        <p className="text-softGray">مێزبەتاڵە</p>
      </div>
    ),
  },
  {
    icon: Meal,
    title: "داواکارییەکان",
    price: data?.today_order,
    percentage: "+5%",
    percentageColor: "text-success",
    color: "bg-successSoft text-success",
    isIQD: false,
    bottom: (
      <div className="flex gap-2 text-sm ">
        <DownArrow />
        <span>{data?.compare_to_yestrday_order?.toLocaleString()}</span>
        <p className="text-softGray">بەراورد بە دوێنێ</p>
      </div>
    ),
  },
];
