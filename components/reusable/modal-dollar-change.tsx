"use client";
import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import DollarChangeAndCalculate from "./dollar-update";
import { DollarIconPrimary } from "@/public/icons";
import { Currency } from "@/app/(root)/setting/_type";

function ModalDollarUpdate({ currency }: { currency: Currency }) {
  return (
    <CustomDialog
      icon={DollarIconPrimary}
      text_button="150,000"
      classContent="max-w-[500px]"
      iconPlacement="right"
      className="bg-table text-foreground hover:bg-table hover:text-foreground"
      title="نوێکردنەوەی نرخی دۆلار"
    >
      <DollarChangeAndCalculate
        info={{
          USDrate: currency.dollar_price,
        }}
      />
    </CustomDialog>
  );
}

export default ModalDollarUpdate;
