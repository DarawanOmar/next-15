import React, { Suspense } from "react";
import { InvoiceType } from "../../../[...slug]/page";
import { DataTable } from "@/components/reusable/table";
import column from "./column";
import { getAllInvoice } from "../../../_lib";
import EmptyImage from "@/components/reusable/empty-image";
import { FallBackInput } from "@/components/reusable/search";
import PaginatedComponent from "@/components/reusable/pagination";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Receipt } from "@/public/icons";
import Link from "next/link";

type Props = {
  searchParams: searchParamsType;
};

async function FeedCard({ searchParams }: Props) {
  const page = Number((await searchParams).page) || 1;
  const type = (await searchParams).type || ("buy" as InvoiceType);
  const payment_type = (await searchParams).payment_type || "";
  const time = (await searchParams).time || "";
  const date = (await searchParams).range || "";
  const allInvoice = await getAllInvoice(
    type as InvoiceType,
    payment_type as string,
    time as string,
    date as string,
    page
  );
  if (allInvoice.data?.data.length === 0) {
    return <EmptyImage />;
  }
  return (
    <>
      {type === "sale" ? (
        <DataTable
          columns={column}
          data={allInvoice.data?.data || []}
          isSearch={false}
        />
      ) : (
        <>
          <div className="my-5">
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {allInvoice.data?.data?.map((invoice) => (
                  <Link
                    key={invoice.invoice_id}
                    href={`/setting/${type}/${invoice.invoice_id}`}
                    className="bg-white dark:bg-white/5 dark:border rounded-3xl p-5 hover:scale-105 transition-all duration-500 "
                  >
                    <div className="flex flex-col justify-center items-center gap-2">
                      <div className="bg-table p-4 rounded-full">
                        <Receipt height={36} />
                      </div>
                      <p className="text-lg mt-2">{invoice?.invoice_number}</p>
                    </div>
                    <Separator className="my-5" />
                    <div className="flex justify-center gap-1.5 items-center text-xl text-primary my-4">
                      <span>IQD</span>
                      <p>{invoice?.total_amount?.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-table rounded-full py-1 px-3 dark:bg-white/5 dark:border ">
                        {invoice.payment_type === "loan" ? "قەرز" : "کاش"}
                      </div>
                      <p>
                        {format(new Date(invoice?.created_at), "yyyy-MM-dd")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="my-10">
                <Suspense fallback={<FallBackInput />}>
                  <PaginatedComponent
                    currentPage={page}
                    totalPages={allInvoice.data?.total_pages || 1}
                  />
                </Suspense>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}

export default FeedCard;
