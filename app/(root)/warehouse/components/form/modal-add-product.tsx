"use client";

import React from "react";
import AddProduct from "./add-product";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";

function ModalAddProduct() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      className="max-sm:w-full"
      text_button="زیادکردنی کاڵا"
      classContent="max-w-2xl"
      iconPlacement="left"
    >
      <AddProduct handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalAddProduct;
