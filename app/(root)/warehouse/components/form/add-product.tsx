"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { addProduct, addProductType } from "../../_type";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { sizeImage } from "@/lib/globals";
import { FileSvgDraw } from "@/public/icons";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { CheckCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryItem } from "@/app/(root)/setting/_lib";
import { addProductAction, updateProductAction } from "../../client-action";
import { DatePickerForm } from "@/components/reusable/date-picker-form";

type filmFormProps = {
  isEdit?: boolean;
  info?: addProductType;
  handleClose?: () => void;
  id?: number;
};

export default function AddProduct({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["category_item"],
    queryFn: getAllCategoryItem,
  });
  const [pendding, setPendding] = useTransition();
  const form = useForm<addProductType>({
    resolver: zodResolver(addProduct),
    defaultValues: getDefaultValues(info),
  });

  function onSubmit(values: addProductType) {
    setPendding(async () => {
      const result = isEdit
        ? await updateProductAction(id as number, values)
        : await addProductAction(values);
      if (result.success) {
        toast.success(result.message);
        handleClose && handleClose();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">وێنە</FormLabel>
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
                  <FileInput className="outline-dashed outline-1 outline-white">
                    <div className="flex items-center justify-center flex-col  ">
                      {field.value && (
                        <div className="flex justify-center gap-3 items-center text-primary w-full py-2.5">
                          <CheckCheck size={20} />
                          <p className="text-sm">Uploaded</p>
                        </div>
                      )}
                      {!field.value && <FileSvgDraw />}
                    </div>
                  </FileInput>
                </FileUploader>
              </FormItem>
            )}
          />

          {Object.entries(form.getValues())
            .slice(0, 4)
            .map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => {
                  return (
                    <FormItem className=" w-full  max-w-full">
                      <FormLabel>{labelTranslate(field.name)}</FormLabel>
                      <FormControl>
                        <Input {...field} isform className={cn("w-full ")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}

          <DatePickerForm
            control={form.control}
            name="expiration_date"
            label={labelTranslate("expiration_date")}
            className="w-full"
          />

          {isLoading ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            <SelectFormField
              control={form.control}
              name="item_category_id"
              label={labelTranslate("item_category_id")}
              placeholder="جۆر هەڵبژێرە"
              options={
                data?.data?.map((role) => ({
                  value: role.item_category_id.toString(),
                  label: role.name,
                })) || []
              }
              isForm
            />
          )}
          <SelectFormField
            control={form.control}
            name="unit"
            label={labelTranslate("unit")}
            placeholder="یەکە هەڵبژێرە"
            options={unitOptions}
            isForm
          />
        </div>

        <div className=" max-w-lg mx-auto gap-16 w-full mt-16 mb-6 flex  justify-between items-center ">
          <Button type="submit" className="w-full py-[23px]">
            {pendding ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : isEdit ? (
              "گۆرانکاری"
            ) : (
              "تۆمارکردن"
            )}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full py-[23px] bg-transparent border border-primary text-primary "
            >
              ڕەتکردنەوە
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

const unitOptions = [
  { value: "کیلۆگرام", label: "کیلۆگرام" },
  { value: "گرام", label: "گرام" },
];

const getDefaultValues = (values: Partial<addProductType> = {}) => {
  const defaultValues: addProductType = {
    name: "",
    barcode: "",
    quantity: 0,
    fare_price_per_item: 0,
    expiration_date: new Date(),
    item_category_id: "",
    unit: "",
    image: null,
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "name":
      return "ناو";
    case "barcode":
      return "بارکۆد";
    case "fare_price_per_item":
      return "نرخی کڕین";
    case "expiration_date":
      return "بەرواری بەسەرچوون";
    case "quantity":
      return "بڕ";
    case "item_category_id":
      return "جۆر";
    case "unit":
      return "یەکە";
    default:
      return name;
  }
}
