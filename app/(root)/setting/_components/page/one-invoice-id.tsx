import React from "react";
import Link from "next/link";
import TitlePage from "@/components/layout/title-page";
import TotalShown from "@/components/reusable/total-shown";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight } from "lucide-react";
import { DataTable } from "./_invoice-components/table";
import DetailsPurchaseInvoice from "./_invoice-components/details-purchase-invoice";
import { InvoiceType } from "../../[...slug]/page";
import { getOneUnfinishInvoice as oneFinishedInvoice } from "@/app/(root)/purchase/_lib";

type Props = {
  type: InvoiceType;
  id: string;
};

async function OneInvoiceID({ id, type }: Props) {
  const getOneInvoice = await oneFinishedInvoice(+id);
  return (
    <div className="my-4">
      <TitlePage text=" ڕێکخستنەکان" />
      <div className="flex justify-between items-center my-5">
        <Link
          href={`/setting/invoices?type=${type}`}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-dark_blue transition-all duration-500"
        >
          <ChevronRight size={30} />
          پسوڵەی {id}
        </Link>
      </div>
      {type === "buy" ? (
        <DetailsPurchaseInvoice
          oneInvoice={getOneInvoice?.data || ({} as any)}
        />
      ) : null}
      <Separator className="my-10" />
      <div className="flex justify-end items-end mb-5">
        <TotalShown
          total={getOneInvoice?.data?.total_amount || 0}
          text="کۆی گشتی"
          className="max-w-max"
        />
      </div>
      <DataTable
        data={getOneInvoice?.data?.invoice_item || []}
        type={type}
        currentPage={1}
        totalPage={2}
        havePagination={false}
      />
    </div>
  );
}

export default OneInvoiceID;
