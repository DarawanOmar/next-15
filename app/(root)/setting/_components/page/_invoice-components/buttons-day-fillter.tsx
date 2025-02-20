"use client";

import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import React from "react";

interface ButtonFilter {
  className?: string;
  classButton?: string;
}

function ButtonsDayFillter({ className, classButton }: ButtonFilter) {
  const [day, setDay] = useQueryState("time", {
    defaultValue: "",
    clearOnDefault: true,
    shallow: false,
  });
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-3 font-sirwan_thin min-w-56",
        className
      )}
    >
      {buttonFilter.map((item, index) => (
        <Button
          onClick={() => {
            if (day === item.value) {
              setDay("");
            } else {
              setDay(item.value);
            }
          }}
          key={index}
          variant="outline"
          className={cn(
            "dark:border-white/20 rounded-3xl",
            {
              "bg-primary text-primary-foreground  hover:bg-primary hover:text-primary-foreground ":
                day === item.value,
            },
            classButton
          )}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}

function NewCom({ className, classButton }: ButtonFilter) {
  return <ButtonsDayFillter className={className} classButton={classButton} />;
}

ButtonsDayFillter.NewComTest = NewCom;

export default ButtonsDayFillter;

export const buttonFilter = [
  {
    title: "ئەمڕۆ",
    value: "daily",
  },
  {
    title: "هەفتانە",
    value: "weekly",
  },
  {
    title: "مانگانە",
    value: "monthly",
  },
];
