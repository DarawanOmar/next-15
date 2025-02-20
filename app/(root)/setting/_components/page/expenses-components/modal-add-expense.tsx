"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";
import AddExpenses from "./add-expenses-form";

function ModalAddExpenses() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      text_button="زیادکردنی خەرجی"
      title="زیادکردنی خەرجی"
      classContent="max-w-2xl"
      iconPlacement="left"
    >
      <AddExpenses handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalAddExpenses;
