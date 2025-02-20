"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCheck, LucideLoader2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  createInvoiceShcema,
  createInvoiceType,
  OneInvoice,
  SupplierOrCustomer,
} from "../../_type";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/reusable/date-picker";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { sizeImage } from "@/lib/globals";
import { FileSvgDraw } from "@/public/icons";
import { LuCirclePlus } from "react-icons/lu";
import { addInvoiceAction } from "../../client-action";
import { toast } from "sonner";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { useQuery } from "@tanstack/react-query";
import { getSupplierOrCustomer } from "../../_lib";
import { DatePickerForm } from "@/components/reusable/date-picker-form";
import LoadingSelectSkeleton from "@/components/layout/loading-select-skeleton";

type Props = {
  invoice: createInvoiceType;
  supplier: SupplierOrCustomer[];
};

const CreateInvoiceForm = ({ invoice }: Props) => {
  const router = useRouter();
  const form = useForm<createInvoiceType>({
    resolver: zodResolver(createInvoiceShcema),
    defaultValues: getDefaultValues(invoice),
  });
  const { data: supplier, isLoading } = useQuery({
    queryKey: ["partie_users"],
    queryFn: () => getSupplierOrCustomer("supplier"),
  });

  const [pendding, startTransication] = React.useTransition();
  async function onSubmit(values: createInvoiceType) {
    console.log("Values", values);
    startTransication(async () => {
      const result = await addInvoiceAction(values);
      if (result?.success) {
        toast.success(result.message);
        form.reset();
        router.refresh();
      } else {
        toast.error(result?.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        id="sale-hook-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className=" font-sirwan_thin w-full mb-10 xl:max-w-5xl 2xl:max-w-7xl"
      >
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5 w-full    ">
          <FormField
            control={form.control}
            name="payment_type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Tabs
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <TabsList className=" rounded-xl w-full">
                      <TabsTrigger
                        className="w-full h-[38px] rounded-none bg-white  rounded-l-xl"
                        value="loan"
                      >
                        قەرز
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full h-[38px] rounded-none bg-white  rounded-r-xl"
                        value="cash"
                      >
                        کاش
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
              </FormItem>
            )}
          />
          {isLoading ? (
            <LoadingSelectSkeleton form={form.control} />
          ) : (
            <SelectFormField
              control={form.control}
              name="partie_id"
              label={""}
              isLabel={false}
              placeholder="دابینکەر هەڵبژێرە"
              className="bg-white dark:bg-black/15 dark:border "
              options={
                supplier?.data?.map((supplier) => ({
                  value: supplier.partie_id.toString(),
                  label: supplier.name,
                })) || []
              }
            />
          )}

          <FormField
            control={form.control}
            name="supplier_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      "w-full placeholder:text-softGray rounded-xl",
                      {
                        "border-red-500":
                          form.formState.errors[
                            field.name as keyof createInvoiceType
                          ],
                      }
                    )}
                    list="customer"
                    placeholder={fetNameField(field.name)}
                  />
                </FormControl>
                {/* <datalist id="customer">
                  {customer &&
                    customer?.data?.map((col, i) => (
                      <option key={i} value={col.name}>
                        {col.name}
                      </option>
                    ))}
                </datalist> */}
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          {Object.entries(form.getValues())
            .slice(0, 2)
            .map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={fetNameField(field.name)}
                        className={cn(" rounded-xl placeholder:text-softGray", {
                          "border-red-500 placeholder:text-red-500":
                            form.formState.errors[
                              field.name as keyof createInvoiceType
                            ],
                        })}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

          {/*  Image*/}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FileUploader
                  value={field.value ? [field.value] : null}
                  onValueChange={(files) => {
                    const selectedFile = files?.[0] || null;
                    field.onChange(selectedFile);
                  }}
                  dropzoneOptions={{
                    multiple: false,
                    maxFiles: 19,
                    maxSize: sizeImage,
                  }}
                  reSelect={true}
                  className="relative bg-background rounded-lg  "
                >
                  <FileInput className="outline-dashed outline-1 outline-none mt-1">
                    <div className="flex items-center justify-center flex-col  ">
                      {field.value && (
                        <div className="flex justify-center gap-3 items-center text-primary w-full py-2.5 border rounded-xl">
                          <CheckCheck size={20} />
                          <p className="text-sm">Uploaded</p>
                        </div>
                      )}
                      {!field.value && (
                        <FileSvgDraw className="text-softGray" />
                      )}
                    </div>
                  </FileInput>
                </FileUploader>
              </FormItem>
            )}
          />
          {/* Date */}

          <DatePickerForm
            control={form.control}
            name="date"
            label={""}
            className="w-full mt-0.5"
          />

          <Button
            disabled={pendding}
            iconPlacement="left"
            className=" rounded-xl bg-transparent border border-primary text-primary mt-1"
            icon={pendding ? LucideLoader2 : LuCirclePlus}
          >
            {pendding ? "" : "زیادکردنی پسووڵە"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateInvoiceForm;

export const fetNameField = (name: string) => {
  switch (name) {
    case "invoice_number":
      return "ژمارەی پسوڵە ";
    case "supplier_name":
      return "ناوی وەکیل";
    case "phone":
      return "ژمارەی مۆبایل";
    default:
      return name;
  }
};

const getDefaultValues = (values: Partial<createInvoiceType> = {}) => {
  const defaultValues: createInvoiceType = {
    invoice_number: "",
    phone: "",
    supplier_name: "",
    date: new Date(),
    payment_type: "cash",
    file: null,
    partie_id: "",
  };

  return { ...defaultValues, ...values };
};
