"use client";
import { Category } from "@/app/(root)/setting/_type";
import { cn } from "@/lib/utils";
import { BrzhawIcon, GlassIcon, PanIcons, SweetIcon } from "@/public/icons";
import { useQueryState } from "nuqs";
import React from "react";

type Props = {
  categorey: Category[];
};

function CategoryFood({ categorey }: Props) {
  const [type, setType] = useQueryState("category_id", {
    defaultValue: "",
    clearOnDefault: true,
    shallow: false,
  });
  console.log(categorey);
  return (
    <div className="flex justify-between items-center bg-white dark:bg-white/5 dark:border border rounded-full p-2 px-6">
      {categorey.slice(2, 6).map((cate) => (
        <button
          key={cate.category_id}
          onClick={() => {
            if (type === cate.category_id.toString()) {
              setType("");
            } else {
              setType(cate.category_id.toString());
            }
          }}
          className={cn("p-2 rounded-md transition-all duration-300 ", {
            "bg-primary10 text-primary dark:bg-white/5 dark:border":
              type === cate.category_id.toString(),
          })}
        >
          {icons.find((icon) => icon.value === cate.name_ku)?.icon}
        </button>
      ))}
    </div>
  );
}

export default CategoryFood;

const icons = [
  {
    value: "چێشتخانە",
    icon: <PanIcons />,
  },
  {
    value: "خوادنەوە",
    icon: <GlassIcon />,
  },
  {
    value: "موقەبیلات",
    icon: <SweetIcon />,
  },
  {
    value: "برژاو",
    icon: <BrzhawIcon />,
  },
];
