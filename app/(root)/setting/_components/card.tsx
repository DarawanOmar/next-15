"use client";
import { BiSolidCategoryAlt } from "react-icons/bi";
import CustomDialog from "@/components/reusable/resusable-dialog";
import {
  ActivityHistory,
  Database,
  ExpensesIcon,
  NoteIcon,
  ProfitIcon,
  SavedIcon,
} from "@/public/icons";
import { SunMedium } from "lucide-react";
import { HiIdentification } from "react-icons/hi";
import Link from "next/link";
import React from "react";
import { FaReceipt, FaUser } from "react-icons/fa6";
import CashFrom from "./from/cash-form";
import IntroduseExpenses from "./from/introdeuse-expenses-form";
import SpecailsForm from "./from/specails-profit-form";
import FoodNoteForm from "./from/food-note-form";
import ChangeTheme from "./from/change-theme-form";
import { IoAddCircle } from "react-icons/io5";
import AddOptions from "./from/add-options-form";
import AddFoodTypeWarehouse from "./from/add-type-food-warehouse-form";
import AddCategory from "./from/add-category";

function Card() {
  const [name, setName] = React.useState("");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-sm:m-5">
        {button.map((item, index) => (
          <React.Fragment key={index}>
            {item.is_page ? (
              <Link
                href={item.href}
                className="bg-white dark:bg-black rounded-xl p-10 flex justify-center items-center gap-3 hover:shadow-xl transition-all  hover:bg-primary hover:text-white hover:scale-105 dark:border dark:rounded-3xl dark:border-primary"
              >
                {item.icon}
                <span className="text-lg ">{item.name}</span>
              </Link>
            ) : (
              <div
                onClick={() => setName(item.name)}
                className="bg-white dark:bg-black rounded-xl p-10 flex justify-center items-center gap-3 cursor-pointer hover:shadow-2xl transition-all  hover:bg-primary hover:text-white hover:scale-105 dark:border dark:rounded-3xl dark:border-primary"
              >
                {item.icon}
                <span className="text-lg ">{item.name}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <CustomDialog
        isWithouTrigger
        title="قاسە"
        classContent="max-w-2xl"
        open={name === "قاسە"}
        onOpenChange={() => setName("")}
      >
        <CashFrom />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="ناساندنی خەرجی"
        classContent="max-w-md"
        open={name === "ناساندنی خەرجی"}
        onOpenChange={() => setName("")}
      >
        <IntroduseExpenses />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="قازانجە تایبەتیەکان"
        classContent="max-w-sm"
        open={name === "قازانجە تایبەتیەکان"}
        onOpenChange={() => setName("")}
      >
        <SpecailsForm />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="تێبینی خواردنەکان"
        classContent="max-w-md"
        open={name === "تێبینی خواردنەکان"}
        onOpenChange={() => setName("")}
      >
        <AddFoodTypeWarehouse />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="زیادکردنی هەڵبژاردنەکان"
        classContent="max-w-3xl "
        open={name === "زیادکردنی هەڵبژاردنەکان"}
        onOpenChange={() => setName("")}
      >
        <AddOptions />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="جۆری خواردن"
        classContent="max-w-md "
        open={name === "جۆری خواردن"}
        onOpenChange={() => setName("")}
      >
        <AddCategory />
      </CustomDialog>
      <CustomDialog
        isWithouTrigger
        title="گۆڕینی ڕووکار"
        classContent="max-w-lg "
        open={name === "گۆڕینی ڕووکار"}
        onOpenChange={() => setName("")}
      >
        <ChangeTheme />
      </CustomDialog>
    </>
  );
}

export default Card;

const button = [
  {
    is_page: true,
    icon: <FaUser size={28} />,
    name: "ئەرکەکان",
    href: "/setting/roles",
  },
  {
    is_page: true,
    icon: <HiIdentification size={28} />,
    name: "بەکارهێنەران",
    href: "/setting/users",
  },
  {
    is_page: true,
    icon: <FaReceipt size={28} />,
    name: "پسووڵەکان",
    href: "/setting/invoices",
  },
  {
    is_page: false,
    icon: <Database height={28} width={28} />,
    name: "قاسە",
    href: "",
  },

  {
    is_page: false,
    icon: <SavedIcon height={28} width={28} />,
    name: "ناساندنی خەرجی",
    href: "",
  },
  {
    is_page: false,
    icon: <ProfitIcon height={28} width={28} />,
    name: "قازانجە تایبەتیەکان",
    href: "",
  },
  {
    is_page: true,
    icon: <ActivityHistory height={28} width={28} />,
    name: "مێژووی چالاکیەکان",
    href: "/setting/activity-history",
  },
  {
    is_page: false,
    icon: <NoteIcon height={28} width={28} />,
    name: "تێبینی خواردنەکان",
    href: "",
  },
  {
    is_page: false,
    icon: <IoAddCircle size={28} />,
    name: "زیادکردنی هەڵبژاردنەکان",
    href: "",
  },
  {
    is_page: true,
    icon: <ExpensesIcon height={28} width={28} />,
    name: "خەرجییەکان",
    href: "/setting/expenses",
  },
  {
    is_page: false,
    icon: <BiSolidCategoryAlt size={28} />,
    name: "جۆری خواردن",
    href: "",
  },

  {
    is_page: false,
    icon: <SunMedium size={28} />,
    name: "گۆڕینی ڕووکار",
    href: "",
  },
];
