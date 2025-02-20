import React from "react";
import ModalDollarUpdate from "./modal-dollar-change";
import { getCurrency } from "@/app/(root)/setting/_lib";
import { Currency } from "@/app/(root)/setting/_type";

async function DollarChanger() {
  const dollar = await getCurrency();
  return <ModalDollarUpdate currency={dollar.data || ({} as Currency)} />;
}

export default DollarChanger;
