"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { Invoice } from "../_type";
import { deleteEmptyInvoice } from "../_actions";

type Props = {
  unFinishInvoice: Invoice[];
};

function InvoiceSelect({ unFinishInvoice }: Props) {
  const [invoice, setInvoice] = useQueryState("invoice_id", {
    clearOnDefault: true,
    defaultValue: "0",
    shallow: false,
  });
  return (
    <Select dir="rtl" onValueChange={setInvoice} name={invoice}>
      <SelectTrigger className="max-sm:w-full w-[200px] rounded-xl">
        <SelectValue placeholder="پسوڵە تەواونەکراوەکان" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex justify-between items-center text-softGray my-2">
          <SelectItem value={"0"}>هیچیان</SelectItem>
        </div>

        {unFinishInvoice?.map((invoice) => (
          <div
            className="flex justify-between items-center text-softGray my-2"
            key={invoice.invoice_id}
          >
            <SelectItem value={invoice.invoice_id.toString()}>
              پسووڵەی {invoice.invoice_number}
            </SelectItem>

            <ReusableDeleteDailog
              title="دڵنیایت لە سڕینەوەی پسووڵە"
              isFreshButtonPass
              button={
                <div className="bg-red-100 rounded-full p-1 cursor-pointer hover:bg-red-300 transition-all duration-500">
                  <Trash2 size={15} className="text-error" />
                </div>
              }
              actionDelete={deleteEmptyInvoice}
              id={invoice.invoice_id.toString()}
            />
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}

export default InvoiceSelect;
