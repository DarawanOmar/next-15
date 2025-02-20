"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Barcode, LucideLoader2 } from "lucide-react";
import { FaRunning } from "react-icons/fa";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { addProductSchema, addProductType, OneInvoice } from "../../_type";
import CustomDialog from "@/components/reusable/resusable-dialog";
import FastSale from "../fast-sale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus, FaReceipt } from "react-icons/fa6";
import CustomShowProducts from "../customShowProducts";
import { DatePickerForm } from "@/components/reusable/date-picker-form";
import { addItemInvoice, finishInvoice } from "../../_actions";
import { getItems } from "../../_lib";
import TotalShown from "@/components/reusable/total-shown";
import { useQueryState } from "nuqs";
import { TextField } from "@/components/reusable/input-form-reusable";

type Props = {
  invoice: OneInvoice;
};

function AddPurchaseProduct({ invoice }: Props) {
  const { data: suggestItems, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(""),
  });
  const [invoiceQuesry, setInvoice] = useQueryState("invoice_id", {
    clearOnDefault: true,
    defaultValue: "0",
    shallow: false,
  });
  const [openFastSale, setOpenFastSale] = React.useState(false);
  const barcodeRef = React.useRef<HTMLInputElement>(null);
  const [pendding, startTransition] = React.useTransition();
  const [penddingFinsesh, startTransitionFinesh] = React.useTransition();
  const router = useRouter();
  const form = useForm<addProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: getDefaultValues(),
  });

  const watchBarcode = form.watch("barcode");
  const watchName = form.watch("name");
  const isLoan = invoice?.payment_type === "loan" ? true : false;
  useEffect(() => {
    if (!suggestItems?.data) return; // Stop auto-fill when manually editing

    // if (!watchBarcode || !watchName) {
    //   return form.reset();
    // }
    // Find a matching item
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
      form.setValue("item_id", matchedItem.item_id);
      form.setValue("unit", matchedItem.unit);
      form.setValue("price", matchedItem.inventorys[0]?.fare_price_per_item);
    } else {
      // Allow clearing when no match is found
      form.setValue("name", watchName);
      form.setValue("barcode", watchBarcode);
    }
  }, [watchBarcode, watchName, suggestItems?.data]);

  async function onSubmit(values: addProductType) {
    startTransition(async () => {
      const response = await addItemInvoice(invoice.invoice_id, values);
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
    if (invoice?.invoice_item?.length === 0) {
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

  // Track when the user interacts with the form

  //   const handleSymbol = (symbol: any, matchedSymbologies: any) => {};
  //   useSymbologyScanner(handleSymbol, {
  //     target:barcodeRef,
  //     scannerOptions: {
  //       prefix: "data:text/plain;base64",
  //       maxDelay: 20,
  //       suffix: "data:text/plain;base64",
  //     },
  //   });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 text-softGray">
          <h1 className="font-sirwan text-xl">کڵا زیادبکە</h1>
          <p className="text-muted-foreground font-sirwan_thin tracking-wide text-sm">
            کاڵا زیادبکە لە ڕێگەی ناو یان باڕکۆد یان زیادکردنی خێرا
          </p>
        </div>
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
          id="formAddItem"
          className="w-full flex flex-col gap-5 my-5 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Add Product */}
          <div
            className={cn(
              "grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-5 w-full   "
            )}
          >
            {/*  Fast Sale Button*/}
            <CustomDialog
              open={openFastSale}
              onOpenChange={setOpenFastSale}
              text_button={"کڕینی خێرا"}
              icon={FaRunning}
              iconPlacement="left"
              classContent="max-w-3xl w-full"
              className="2xl:max-w-[280px] 2xl:w-full"
            >
              {/* <FastSaleAction /> */}
              <FastSale form={form} setOpenFastSale={setOpenFastSale} />
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
                      onKeyDown={handleKeyDown}
                      placeholder={fetNameField(field.name)}
                      className={cn(
                        "rounded-xl w-full 2xl:max-w-[280px] 2xl:w-full",
                        {
                          "border-red-500 placeholder:text-red-500":
                            form.formState.errors[field.name as "barcode"],
                        }
                      )}
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
                      className={cn(
                        "  2xl:max-w-[280px] 2xl:w-full  rounded-xl w-full",
                        {
                          "border-red-500 placeholder:text-red-500":
                            form.formState.errors[field.name as "name"],
                        }
                      )}
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

            {Object.entries(form.getValues())
              .slice(2, 6)
              .map(([key, value]) => (
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
                            className={cn(
                              "  2xl:max-w-[280px] 2xl:w-full  rounded-xl w-full",
                              {
                                "border-red-500 placeholder:text-red-500":
                                  form.formState.errors[
                                    field.name as "barcode" | "name" | "unit"
                                  ],
                              }
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            <DatePickerForm
              control={form.control}
              name="expiration_date"
              className="w-full 2xl:max-w-[280px] 2xl:w-full"
              label=""
            />

            <Button
              disabled={pendding}
              form="formAddItem"
              size={"lg"}
              className=" rounded-xl bg-transparent border border-primary text-primary"
              iconPlacement="left"
              icon={FaPlus}
            >
              {pendding ? (
                <LucideLoader2 className="size-5 animate-spin" />
              ) : (
                "  زیادکردنی کاڵا"
              )}
            </Button>
          </div>

          {/* Finish Receipt */}
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 my-5 mt-10 lg:max-w-sm gap-5",
              {
                "md:grid-cols-3": invoice?.payment_type === "loan",
              }
            )}
          >
            {isLoan ? (
              <TextField
                control={form.control}
                name="pay"
                label=""
                placeholder="پارە بۆ دانەوە"
                className="bg-white"
                classFormItem="w-full"
              />
            ) : null}
            <TotalShown
              text="کۆی گشتی"
              total={
                invoice?.invoice_item?.reduce(
                  (acc, item) => acc + item.total_price,
                  0
                ) || 0
              }
            />
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

          <hr />
        </form>
      </Form>
      <section className="py-4 px-5">
        <CustomShowProducts
          selectedProducts={invoice?.invoice_item || []}
          isPurchase
        />
      </section>
    </>
  );
}

export default AddPurchaseProduct;

export const fetNameField = (name: string) => {
  switch (name) {
    case "barcode":
      return " باڕکۆد";
    case "name":
      return "ناو";
    case "unit":
      return "یەکە";
    case "quantity":
      return "بڕ";
    case "price":
      return "نرخی کڕین";
    case "total_price":
      return "کۆی پارە";

    default:
      return name;
  }
};

const getDefaultValues = (values: Partial<addProductType> = {}) => {
  const defaultValues: addProductType = {
    barcode: "",
    name: "",
    quantity: 1,
    total_price: 0,
    price: 0,
    unit: "",
    expiration_date: new Date(),
    invoice_id: 0,
    item_id: 0,
  };

  return { ...defaultValues, ...values };
};
