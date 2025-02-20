import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import React, { Suspense } from "react";
import InvoiceSelect from "./_components/invoice-select";
import CreateInvoiceForm from "./_components/form/create-invoice-form";
import { Separator } from "@/components/ui/separator";
import AddPurchaseProduct from "./_components/form/add-product";
import { FallBackInput } from "@/components/reusable/search";
import DollarChanger from "@/components/reusable/dollar-changer";
import {
  getOneUnfinishInvoice,
  getSupplierOrCustomer,
  getUnfinishInvoice,
} from "./_lib";

async function PurchasePage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const invoice_id = Number((await searchParams)?.invoice_id) || 0;
  const unfinishedInvoice = await getUnfinishInvoice("buy");
  const invoice = await getOneUnfinishInvoice(invoice_id);
  const supplier = await getSupplierOrCustomer();

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <TitlePage text="کڕین" />
        <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-5 max-sm:w-full">
          <DollarChanger />
          <Suspense fallback={<FallBackInput />}>
            <InvoiceSelect
              unFinishInvoice={unfinishedInvoice?.data?.data || []}
            />
          </Suspense>
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-softGray font-sirwan_meduim text-lg mb-3">
          دروستکردنی پسووڵە
        </h1>
        <CreateInvoiceForm
          key={invoice_id}
          invoice={{
            file: null,
            payment_type: invoice?.data?.payment_type || "cash",
            phone: invoice?.data?.invoice_number || "",
            date: invoice?.data?.created_at
              ? new Date(invoice?.data?.created_at)
              : new Date(),
            invoice_number: invoice?.data?.invoice_number || "",
            supplier_name: invoice?.data?.invoice_number || "",
            partie_id: invoice?.data?.partie_id?.toString() || "",
          }}
          supplier={supplier?.data || []}
        />
        <Separator className="my-5" />
        <AddPurchaseProduct invoice={invoice?.data || ({} as any)} />
      </div>
    </div>
  );
}

export default PurchasePage;
