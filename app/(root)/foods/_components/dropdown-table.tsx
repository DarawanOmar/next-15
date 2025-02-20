"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { ArchiveIcon, EditIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddFoodForm from "./form/add-food-form";
import { Food } from "../_type";
import { deleteFoodAction } from "../_actions";

type Props = {
  food: Food;
};
function FoodDropdown({ food }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const hahandleOpenAddNewItem = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <span className="absolute top-2 left-7">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="absolute top-1 right-1 cursor-pointer">
              <HiOutlineDotsVertical className="h-5 w-5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-3 rounded-xl flex flex-col justify-start items-end"
          >
            <CustomDialog
              open={isOpen}
              onOpenChange={setOpen}
              icon={EditIcon}
              text_button="گۆڕانکاری"
              className="bg-transparent text-foreground hover:text-white rounded-none rounded-t-xl w-full"
              classContent="max-w-2xl"
              iconPlacement="right"
              title="گۆڕانکاری"
            >
              <AddFoodForm
                isEdit
                handleClose={hahandleOpenAddNewItem}
                id={food.food_id}
                info={{
                  calories: food.calories,
                  image: null,
                  name_ar: food.name_ar,
                  name_en: food.name_en,
                  name_ku: food.name_ku,
                  name_turkey: food.name_turkey,
                  price: food.price,
                  description: food.description,
                  propertys: [],
                  category_id: food.category_id?.toString(),
                  item_id: food.item_id?.toString(),
                }}
                properties={food.food_question}
              />
            </CustomDialog>
            <Separator />
            <ReusableDeleteDailog
              title="دڵنیای لە ئەرشیفکردنی بەرهەم !"
              isFreshButtonPass
              button={
                <Button
                  effect={"shine"}
                  type="submit"
                  iconPlacement="right"
                  icon={ArchiveIcon}
                  className="bg-transparent text-foreground w-full hover:text-white rounded-none rounded-b-xl"
                >
                  ئەرشیفکردن
                </Button>
              }
              actionDelete={deleteFoodAction}
              id={food.food_id.toString()}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </>
  );
}

export default FoodDropdown;
