"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";
import AddTable from "./add-table";

function ModalAddTable() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      text_button="زیادکردنی مێز"
      classContent="max-w-sm"
      iconPlacement="left"
      title="زیادکردنی مێز"
      className="max-sm:w-full max-sm:text-xs"
    >
      <AddTable handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalAddTable;
