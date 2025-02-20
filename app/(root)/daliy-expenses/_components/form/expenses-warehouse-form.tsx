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
import { expensesWarehouse, expensesWarehouseType } from "../../_type";
import FastSale from "@/app/(root)/purchase/_components/fast-sale";
import { FaRunning } from "react-icons/fa";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { toast } from "sonner";
import { OneInvoice } from "@/app/(root)/purchase/_type";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/app/(root)/purchase/_lib";
import { addItemInvoice } from "@/app/(root)/purchase/_actions";

type Props = {
  invoice: OneInvoice;
};

const ExpensesWarehouse = ({ invoice }: Props) => {
  const { data: suggestItems, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(""),
  });
  const form = useForm<expensesWarehouseType>({
    resolver: zodResolver(expensesWarehouse),
    defaultValues: {
      barcode: "",
      name: "",
      quantity: 0,
      amount: 0,
      item_id: 0,
    },
  });
  const barcodeRef = React.useRef<HTMLInputElement>(null);
  const [pendding, startTransition] = React.useTransition();
  const [openFastSale, setOpenFastSale] = React.useState(false);

  const watchBarcode = form.watch("barcode");
  const watchName = form.watch("name");

  React.useEffect(() => {
    if (!suggestItems?.data) return; // Stop auto-fill when manually editing
    const matchedItem =
      suggestItems.data.find((item: any) => item.barcode === watchBarcode) ||
      suggestItems.data.find((item: any) => item.name === watchName);

    if (matchedItem) {
      if (watchBarcode) {
        form.setValue("name", matchedItem.name, { shouldValidate: true });
      }
      if (watchName) {
        form.setValue("barcode", matchedItem.barcode, { shouldValidate: true });
      }
      form.setValue("item_id", matchedItem.item_id, { shouldValidate: true });
    } else {
      // Allow clearing when no match is found
      form.setValue("name", watchName);
      form.setValue("barcode", watchBarcode);
    }
  }, [watchBarcode, watchName, suggestItems?.data]);

  async function onSubmit(values: expensesWarehouseType) {
    startTransition(async () => {
      const response = await addItemInvoice(invoice.invoice_id, {
        item_id: values.item_id,
        quantity: values.quantity,
        total_price: values.amount,
        expiration_date: new Date(),
      });
      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-softGray text-lg ">خەرجی کۆگا</h1>
        <Button
          className="bg-error"
          type="button"
          onClick={() => {
            form.reset();
          }}
        >
          بەتاڵکردنەوە
        </Button>
      </div>

      <Form {...form}>
        <form
          id="sale-hook-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className=" font-sirwan_thin w-full mb-10 xl:max-w-5xl 2xl:max-w-7xl"
        >
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5 w-full    ">
            <CustomDialog
              open={openFastSale}
              onOpenChange={setOpenFastSale}
              text_button={"کڕینی خێرا"}
              icon={FaRunning}
              iconPlacement="left"
            >
              <FastSale setOpenFastSale={setOpenFastSale} form={form} />
            </CustomDialog>

            <FormField
              name="barcode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      ref={barcodeRef}
                      onChange={(e) => {
                        field.onChange(e); // Keep form state updated
                      }}
                      placeholder={fetNameField(field.name)}
                      className={cn(" md:max-w-52   rounded-xl w-full", {
                        "border-red-500 placeholder:text-red-500":
                          form.formState.errors[field.name as "barcode"],
                      })}
                      list="suggestionBarcode"
                    />
                  </FormControl>
                  <datalist id="suggestionBarcode">
                    {suggestItems &&
                      suggestItems?.data?.map((item: any) => (
                        <option key={item.item_id} value={item.barcode}>
                          {item.barcode}
                        </option>
                      ))}
                  </datalist>
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder={fetNameField(field.name)}
                      className={cn(" md:max-w-52   rounded-xl w-full", {
                        "border-red-500 placeholder:text-red-500":
                          form.formState.errors[field.name as "name"],
                      })}
                      list="suggestionName"
                    />
                  </FormControl>
                  <datalist id="suggestionName">
                    {suggestItems &&
                      suggestItems?.data?.map((item: any) => (
                        <option key={item.item_id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </datalist>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"quantity"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={fetNameField(field.name)}
                      className={cn(" rounded-xl placeholder:text-softGray", {
                        "border-red-500 placeholder:text-red-500":
                          form.formState.errors[field.name as "quantity"],
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"amount"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={fetNameField(field.name)}
                      className={cn(" rounded-xl placeholder:text-softGray", {
                        "border-red-500 placeholder:text-red-500":
                          form.formState.errors[field.name as "amount"],
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={pendding}
              iconPlacement="left"
              className=" rounded-xl bg-transparent border border-primary text-primary"
              icon={pendding ? LucideLoader2 : LuCirclePlus}
            >
              {pendding ? "" : "زیادکردنی کاڵا"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ExpensesWarehouse;

export const fetNameField = (name: string) => {
  switch (name) {
    case "barcode":
      return "باڕکۆد ";
    case "name":
      return "ناو";
    case "quantity":
      return "بڕ";
    case "amount":
      return "نرخ";
    default:
      return name;
  }
};
