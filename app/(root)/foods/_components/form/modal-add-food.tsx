"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";
import AddFoodForm from "./add-food-form";

function ModalAddFood() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      text_button="زیادکردنی خوادن"
      title="زیادکردنی خواردن"
      classContent="max-w-2xl"
      iconPlacement="left"
    >
      <AddFoodForm handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalAddFood;
