"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";
import BookingTableForm from "./boking-table";

function ModalReserverTable() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      text_button="گرتنی مێز"
      classContent="max-w-sm"
      iconPlacement="left"
      title="گرتنی مێز"
    >
      <BookingTableForm handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalReserverTable;
