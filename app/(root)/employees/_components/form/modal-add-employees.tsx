"use client";

import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { LuCirclePlus } from "react-icons/lu";
import AddEmployees from "./add-employees";

function ModalAddUser() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      icon={LuCirclePlus}
      text_button="زیادکردنی کارمەند"
      title="زیادکردنی کارمەند"
      classContent="max-w-2xl"
      iconPlacement="left"
    >
      <AddEmployees handleClose={handleClose} />
    </CustomDialog>
  );
}

export default ModalAddUser;
