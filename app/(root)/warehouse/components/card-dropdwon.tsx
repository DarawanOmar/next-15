"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import AddProduct from "./form/add-product";
import { deleteProduct, deleteProductAction } from "../_actions";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { ArchiveIcon, EditIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "../_type";

type Props = {
  item: Item;
};

function DropdwonFrom({ item }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const hahandleOpenAddNewItem = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <span className="absolute top-3 left-8">
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
            >
              <AddProduct
                isEdit
                handleClose={hahandleOpenAddNewItem}
                id={item.item_id}
                info={{
                  image: null,
                  name: item.name,
                  fare_price_per_item: 0,
                  barcode: item.barcode,
                  expiration_date: item.expiration_date
                    ? new Date(item.expiration_date)
                    : new Date(),
                  item_category_id: item.item_category_id.toString(),
                  quantity: item.quantity,
                  unit: item.unit,
                }}
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
                  className="bg-transparent text-foreground w-full hover:text-white rounded-none rounded-b-xl gap4"
                >
                  ئەرشیفکردن
                </Button>
              }
              actionDelete={deleteProductAction}
              id={item.item_id.toString()}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </>
  );
}

export default DropdwonFrom;
