import TitlePage from "@/components/layout/title-page";
import { FallBackInput } from "@/components/reusable/search";
import React, { Suspense } from "react";
import InvoiceSelectExpenses from "./_components/invoice-select";
import { CreateInvoiceExpenseDaily } from "./_components/form/create-invoice-form";
import { Separator } from "@/components/ui/separator";
import ExpensesWarehouse from "./_components/form/expenses-warehouse-form";
import TotalExpenese from "./_components/form/total-expenses-form";
import DollarChanger from "@/components/reusable/dollar-changer";
import { getOneUnfinishInvoice, getUnfinishInvoice } from "../purchase/_lib";
import { OneInvoice } from "../purchase/_type";

async function ExpensesDayPage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const invoice_id = Number((await searchParams).invoice_id) || 0;
  const unfinishedInvoice = await getUnfinishInvoice("expense");
  const invoice = await getOneUnfinishInvoice(invoice_id);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <TitlePage text="خەرجی ڕۆژ" />
        <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-5 max-sm:w-full xl:max-w-lg">
          <DollarChanger />
          <Suspense fallback={<FallBackInput />}>
            <InvoiceSelectExpenses
              unFinishInvoice={unfinishedInvoice.data?.data || []}
            />
          </Suspense>
        </div>
      </div>
      <div className="grid gap-4 my-6">
        <h1 className="text-softGray text-lg ">دروستکردنی پسووڵە</h1>
        <CreateInvoiceExpenseDaily />
      </div>
      <Separator className="my-6" />

      <ExpensesWarehouse invoice={invoice?.data || ({} as any)} />

      <Separator className="my-6" />
      <div className="grid gap-2">
        <h1 className="text-softGray text-lg ">خەرجی گشتی</h1>
        <TotalExpenese invoice={invoice?.data || ({} as any)} />
      </div>
    </div>
  );
}

export default ExpensesDayPage;
