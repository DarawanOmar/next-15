"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { LuCirclePlus } from "react-icons/lu";
import { totalExpenses, totalExpensesType } from "../../_type";
import TotalShown from "@/components/reusable/total-shown";
import { FaReceipt } from "react-icons/fa6";
import CustomShowProducts from "@/app/(root)/purchase/_components/customShowProducts";
import { addItemExpensesInvoice } from "../../_actions";
import { toast } from "sonner";
import { OneInvoice } from "@/app/(root)/purchase/_type";
import { finishInvoice } from "@/app/(root)/purchase/_actions";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type Props = {
  invoice: OneInvoice;
};

const TotalExpenese = ({ invoice }: Props) => {
  const form = useForm<totalExpensesType>({
    resolver: zodResolver(totalExpenses),
    defaultValues: {
      name: "",
      quantity: 0,
      amount: 0,
    },
  });
  const router = useRouter();
  const [penddingFinsesh, startTransitionFinesh] = React.useTransition();
  const [pendding, startTransition] = React.useTransition();
  const [invoiceQuesry, setInvoice] = useQueryState("invoice_id", {
    clearOnDefault: true,
    defaultValue: "0",
    shallow: false,
  });

  async function onSubmit(values: totalExpensesType) {
    startTransition(async () => {
      const response = await addItemExpensesInvoice(invoice.invoice_id, values);
      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    });
  }

  async function fineshReceipt() {
    if (!invoice?.invoice_id) {
      return toast.error("هیچ پسوڵەیەکت هەڵبژێردووە");
    }
    if (
      invoice?.invoice_item?.length === 0 &&
      invoice?.invoice_expense?.length === 0
    ) {
      return toast.error("هیچ کاڵایەکت هەڵبژێردووە");
    }
    startTransitionFinesh(async () => {
      const response = await finishInvoice(invoice.invoice_id);
      if (response.success) {
        toast.success(response.message);
        router.refresh();
        form.reset();
        setInvoice("0");
      } else {
        toast.error(response.message);
      }
    });
  }

  console.log("Formatte => ", formatInvoiceData(invoice));

  return (
    <>
      <Form {...form}>
        <form
          id="sale-hook-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className=" font-sirwan_thin w-full mb-5 xl:max-w-5xl"
        >
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-5 w-full  xl:gap-y-14  ">
            {Object.entries(form.getValues()).map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={fetNameField(field.name)}
                          className={cn(" md:max-w-52   rounded-xl w-full")}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}

            <Button
              disabled={pendding}
              iconPlacement="left"
              className=" rounded-xl bg-transparent border border-primary text-primary"
              icon={pendding ? LucideLoader2 : LuCirclePlus}
            >
              {pendding ? "" : "زیادکردنی کاڵا"}
            </Button>

            <TotalShown
              text="کۆی گشتی"
              total={
                invoice.invoice_item?.reduce((acc, item) => {
                  return acc + item.item_price * item.quantity;
                }, 0) || 0
              }
            />
            <div className="">
              <Button
                type="button"
                onClick={fineshReceipt}
                size={"lg"}
                disabled={penddingFinsesh}
                className=" rounded-xl bg-transparent border border-primary text-primary"
                iconPlacement="left"
                icon={penddingFinsesh ? LucideLoader2 : FaReceipt}
              >
                {penddingFinsesh ? null : "پسووڵە تەواوکرا"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Separator />
      <section className="py-4 px-5">
        <CustomShowProducts
          isPurchase={false}
          // selectedProducts={invoice.invoice_item || []}
          selectedProducts={formatInvoiceData(invoice) || []}
        />
      </section>
    </>
  );
};

export default TotalExpenese;

const formatInvoiceData = (data: OneInvoice) => {
  const { invoice_item = [], invoice_expense = [] } = data; // Provide default empty arrays

  // Convert invoice_expense to match invoice_item structure
  const formattedExpenses = invoice_expense.map((expense) => ({
    invoice_item_id: expense?.invoice_expense_id ?? null, // Convert ID
    item_id: null, // No item_id for expenses
    quantity: expense?.quantity ?? 0, // Default to 0 if undefined
    item_price: expense?.amount ?? 0, // Default to 0 if undefined
    total_price: (expense?.amount ?? 0) * (expense?.quantity ?? 0), // Safe multiplication
    expiration_date: null, // No expiration for expenses
    invoice_id: expense?.invoice_id ?? null,
    added_by: expense?.added_by ?? null,
    created_at: expense?.created_at ?? null,
    updated_at: expense?.updated_at ?? null,
    image: null, // No image for expenses
    name: expense?.subject ?? "Unknown Expense", // Default name
    unit: null, // No unit for expenses
  }));

  // Merge both arrays safely
  const mergedInvoiceItems = [...invoice_item, ...formattedExpenses];

  console.log("Formatted => ", mergedInvoiceItems);

  return mergedInvoiceItems;
};

export const fetNameField = (name: string) => {
  switch (name) {
    case "amount":
      return "نرخ ";
    case "name":
      return "ناو";
    case "quantity":
      return "بڕ";
    default:
      return name;
  }
};
