"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DownArrow, TwoFace, Warning, WarningTime } from "@/public/icons";
import { useQueryState } from "nuqs";
import TwoDate from "./two-date";
import { CategoryItem } from "../../setting/_type";

type Props = {
  categoryItem: CategoryItem[];
};
export type ButtonType = "expired" | "nearExpire" | "low_qunatity" | "multiple";
function RowButtons({ categoryItem }: Props) {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [name, setName] = useQueryState("q", {
    clearOnDefault: true,
    defaultValue: "",
    shallow: false,
  });

  // Button configuration
  const buttons = [
    {
      icon: Warning,
      label: "کاڵا بەسەرچووەکان",
      onClick: (value?: any) => {
        // setQueryName("state");
        setName(name === "expired" ? "" : "expired");
      },
      isActive: name === "expired",
    },
    {
      icon: WarningTime,
      label: "نزیک لە بەسەرچوون",
      onClick: (value?: any) => {
        // setQueryName("state");
        setName(name === "nearExpire" ? "" : "nearExpire");
      },
      isActive: name === "nearExpire",
    },
    {
      icon: DownArrow,
      label: "کاڵاکەمبووەکان",
      onClick: (value?: any) => {
        // setQueryName("state");
        setName(name === "low_qunatity" ? "" : value);
      },
      isActive: name === "low_qunatity",
    },
    {
      icon: DownArrow,
      label: "جۆر",
      onClick: (value?: any) => setOpenInfo((prev) => !prev),
    },
    {
      icon: TwoFace,
      label: "کاڵای دووبەروار",
      onClick: (value?: any) => {
        // setQueryName("state");
        setName(name === "multiple" ? "" : "multiple");
      },
      isActive: name === "multiple",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-5  w-full">
        {buttons.map(({ icon, label, onClick, isActive }, index) => (
          <QueryButton
            categoryItem={categoryItem}
            key={index}
            icon={icon}
            onClick={onClick}
            isActive={isActive}
            className={cn({
              "rounded-tr-lg xl:rounded-r-lg": index === 0,
              "rounded-bl-lg xl:rounded-l-lg": index === buttons.length - 1,
            })}
            isLess={label === "کاڵاکەمبووەکان"}
            isType={label === "جۆر"}
          >
            {label}
          </QueryButton>
        ))}
      </div>

      <CustomDialog
        isWithouTrigger
        classContent="md:max-w-[30rem]"
        title="کاڵای دووبەروار"
        open={openInfo}
        onOpenChange={setOpenInfo}
      >
        <TwoDate />
      </CustomDialog>
    </>
  );
}

export default RowButtons;

// Button component
type QueryButtonProps = {
  icon: React.ReactNode | any;
  children: React.ReactNode;
  onClick: (value: any) => void;
  isActive?: boolean;
  className?: string;
  isLess: boolean;
  isType: boolean;
  categoryItem: CategoryItem[];
};

const QueryButton = ({
  icon,
  children,
  onClick,
  isActive,
  className,
  isLess,
  isType,
  categoryItem,
}: QueryButtonProps) => {
  const [name, setName] = useQueryState("q", {
    clearOnDefault: true,
    defaultValue: "",
    shallow: false,
  });
  const [value, setValue] = React.useState(name);
  const [category_id, setCategory_id] = useQueryState("category", {
    clearOnDefault: true,
    defaultValue: "",
    shallow: false,
  });
  // Special case for "کاڵاکەمبووەکان" button
  if (isLess) {
    return (
      <div className="flex justify-between border bg-white">
        <Button
          icon={icon}
          iconPlacement="left"
          className={cn(
            "text-muted-foreground rounded-none border-none px-6 p-5 hover:bg-none bg-white ",
            {
              "bg-primary text-white hover:bg-primary dark:bg-primary":
                isActive,
            },
            className
          )}
          variant="outline"
          onClick={() => {
            onClick(value);
          }}
        >
          {children}
        </Button>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "text-muted-foreground rounded-none border-none text-center bg-white dark:bg-black w-10 placeholder:text-muted-foreground"
          )}
          placeholder="0"
        />
      </div>
    );
  }

  if (isType) {
    return (
      <div>
        <Input
          value={category_id}
          className="rounded-none bg-white dark:bg-black  placeholder:text-muted-foreground text-muted-foreground"
          placeholder="جۆر"
          list="datalist"
          onChange={(e) => {
            // first find the category id by name
            const category = categoryItem.find(
              (item) => item.name === e.target.value
            );
            if (category) {
              setCategory_id(category.item_category_id.toString());
            } else {
              setCategory_id("");
            }
          }}
        />
        <datalist id="datalist">
          {categoryItem.map((item) => (
            <option key={item.item_category_id} value={item.name} />
          ))}
        </datalist>
      </div>
    );
  }

  // Default button
  return (
    <Button
      icon={icon}
      iconPlacement="left"
      className={cn(
        "text-muted-foreground rounded-none px-6 p-5 hover:bg-none bg-white",
        {
          "bg-primary text-white hover:bg-primary hover:text-white dark:bg-primary":
            isActive,
        },
        className
      )}
      variant="outline"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
