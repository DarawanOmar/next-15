"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Report } from "../_lib";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../setting/_lib";
import { LucideLoader2 } from "lucide-react";

function ModalMore({ report }: { report: Report | undefined }) {
  const {
    data: category,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category_all"],
    queryFn: getAllCategory,
  });
  const [selectCategory, setSelectedCategory] = React.useState("هەموو");
  const [listProduct, setListProduct] = React.useState<any[] | undefined>(
    undefined
  );
  const [listProductCategory, setListProductCategory] = React.useState<
    any[] | undefined
  >(undefined);

  React.useEffect(() => {
    if (report?.most_order && category?.data) {
      setListProduct(report.most_order);
      const uniqueCategories = [
        {
          name_ku: "هەموو",
        },

        ...category.data,
      ];
      setListProductCategory(uniqueCategories);
    }
  }, [category]);

  const filterCategory = (category: string) => {
    if (category === "هەموو") {
      setListProduct(report?.most_order || []);
    } else {
      const filter = report?.most_order?.filter(
        (item) => item.food_name === category
      );
      setListProduct(filter || []);
    }
  };

  return (
    <div className="min-w-0 w-full flex flex-col items-center min-h-96  ">
      {isLoading ? (
        <div className="flex justify-center items-center h-full gap-3">
          Loading
          <LucideLoader2 className="size-5 animate-spin" />
        </div>
      ) : (
        <div className=" max-w-[300px] sm:max-w-[550px] md:max-w-[700px] w-full ">
          <div className=" flex items-center gap-4 overflow-x-auto ">
            {listProductCategory?.map((item, index) => (
              <Button
                variant={"outline"}
                key={index}
                onClick={() => {
                  setSelectedCategory(item.name_ku);
                  filterCategory(item.name_ku);
                }}
                className={cn(
                  "min-w-32 hover:bg-primary hover:text-white hover:opacity-70",
                  {
                    "bg-primary text-white": selectCategory === item.name_ku,
                  }
                )}
              >
                <span>{item.name_ku}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-14 w-full gap-10 ">
        {report?.most_order?.map((food, index) => (
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
    </div>
  );
}

export default ModalMore;

const flitreButtons = [
  {
    name: "چێشتخانە",
  },
  {
    name: "مقبلات",
  },
  {
    name: "خواردنەوە",
  },
  {
    name: "برژاو",
  },
  {
    name: "چێشتخانە",
  },
  {
    name: "مقبلات",
  },
  {
    name: "خواردنەوە",
  },
  {
    name: "برژاو",
  },
  {
    name: "چێشتخانە",
  },
  {
    name: "مقبلات",
  },
  {
    name: "خواردنەوە",
  },
  {
    name: "برژاو",
  },
  {
    name: "برژاو",
  },
  {
    name: "چێشتخانە",
  },
  {
    name: "مقبلات",
  },
  {
    name: "خواردنەوە",
  },
  {
    name: "برژاو",
  },
];
