import React from "react";
import { MoneyIcon } from "@/public/icons";
import { Folder } from "lucide-react";
import { FaPhone, FaUser } from "react-icons/fa6";
import { OneInvoice } from "@/app/(root)/purchase/_type";
import CustomDialog from "@/components/reusable/resusable-dialog";
import Image from "next/image";

type Props = {
  oneInvoice: OneInvoice;
};

function DetailsPurchaseInvoice({ oneInvoice }: Props) {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex gap-3 items-center">
        <div className="bg-table dark:bg-white/5 dark:border p-2 rounded-lg">
          <FaUser />
        </div>
        <p>{oneInvoice.partie_name ?? "No User"}</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-table dark:bg-white/5 dark:border p-2 rounded-lg">
          <FaPhone />
        </div>
        <p>{oneInvoice.partie_phone ?? "No Phone"}</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-table dark:bg-white/5 dark:border p-2 rounded-lg">
          <MoneyIcon />
        </div>
        <p> {oneInvoice.payment_type === "loan" ? "قەرز" : "کاش"}</p>
      </div>

      <CustomDialog
        isFreshButtonPass
        button={
          <div className="flex gap-3 items-center cursor-pointer">
            <div className="bg-table dark:bg-white/5 dark:border p-2 rounded-lg">
              <Folder size={18} />{" "}
            </div>
            <p className="text-primary underline">بینینی فایل</p>
          </div>
        }
        title="فایلی فاکتور"
        classContent="max-w-2xl"
      >
        <Image
          src={
            oneInvoice.file
              ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${oneInvoice.file}`
              : "/logo.png"
          }
          alt={oneInvoice.invoice_number}
          width={800}
          height={800}
          className="rounded-lg m-5 h-[500px] w-[500px]  mx-auto"
        />
      </CustomDialog>
    </div>
  );
}

export default DetailsPurchaseInvoice;
