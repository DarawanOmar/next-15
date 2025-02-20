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
import React, { useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";

import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { sizeImage } from "@/lib/globals";
import { FileSvgDraw } from "@/public/icons";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { addFood, addFoodType, FoodQuestion } from "../../_type";
import { TextAreaField } from "@/components/reusable/textarea-form-reusable";
import { CheckCheck } from "lucide-react";
import { addFoodAction, updateFoodAction } from "../../client-action";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory, getItemAll } from "@/app/(root)/setting/_lib";
import AddQuestionOptions, { SchemaType } from "./add-question-option";
import EditOptionQuestion from "./edit-question-option";

type filmFormProps = {
  isEdit?: boolean;
  info?: addFoodType;
  handleClose?: () => void;
  id?: number;
  properties?: FoodQuestion[];
};

export default function AddFoodForm({
  isEdit,
  info,
  handleClose,
  id,
  properties,
}: filmFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["category_all"],
    queryFn: getAllCategory,
  });
  const { data: item_all, isLoading: item_all_isloading } = useQuery({
    queryKey: ["item_all"],
    queryFn: getItemAll,
  });

  const [pendding, setPendding] = useTransition();
  const form = useForm<addFoodType>({
    resolver: zodResolver(addFood),
    defaultValues: getDefaultValues(info),
  });
  const [schema, setSchema] = React.useState<SchemaType[]>([]);
  form.setValue("propertys", schema);
  function onSubmit(values: addFoodType) {
    setPendding(async () => {
      console.log("Data => ", values);
      const result = isEdit
        ? await updateFoodAction(id as number, values)
        : await addFoodAction(values);
      if (result?.success) {
        toast.success(result.message);
        handleClose && handleClose();
      } else {
        toast.error(result?.message);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="form-hook"
        className="px-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start  gap-7">
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
            .slice(0, 6)
            .map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => {
                  const readOnly = key === "quantity";
                  return (
                    <FormItem className=" w-full  max-w-full">
                      <FormLabel>{labelTranslate(field.name)}</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={readOnly}
                          {...field}
                          isform
                          className={cn("w-full ", {
                            "border-red-500":
                              form.formState.errors[
                                field.name as keyof typeof form.formState.errors
                              ],
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}

          {isLoading ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            <SelectFormField
              control={form.control}
              name="category_id"
              label={labelTranslate("category_id")}
              placeholder="جۆر هەڵبژێرە"
              options={
                data?.data?.map((category) => ({
                  value: category.category_id.toString(),
                  label: category.name_ku,
                })) || []
              }
              isForm
            />
          )}
          {item_all_isloading ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            <SelectFormField
              control={form.control}
              name="item_id"
              label={labelTranslate("item_id")}
              placeholder="جۆری خواردن لە کۆگا هەڵبژێرە"
              options={
                item_all?.data?.map((item) => ({
                  value: item.item_id.toString(),
                  label: item.name,
                })) || []
              }
              isForm
            />
          )}

          <TextAreaField
            control={form.control}
            name="description"
            label="کورتە"
            placeholder="تێبینی"
            className="dark:bg-white/5 dark:border"
          />
        </div>
        {isEdit ? (
          <EditOptionQuestion
            food_id={id as number}
            properties={properties || []}
          />
        ) : (
          <AddQuestionOptions schema={schema} setSchema={setSchema} />
        )}
        <div className=" max-w-lg mx-auto gap-16 w-full mt-16 mb-6 flex  justify-between items-center ">
          <Button id="form-hook" type="submit" className="w-full py-[23px]">
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
              effect={"shine"}
              className="w-full py-[23px] bg-transparent border border-primary hover:text-white text-primary  transition-all duration-500"
            >
              ڕەتکردنەوە
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

const getDefaultValues = (values: Partial<addFoodType> = {}) => {
  const defaultValues: addFoodType = {
    name_ku: "",
    name_ar: "",
    name_turkey: "",
    name_en: "",
    price: 0,
    calories: 0,
    description: "",
    category_id: "",
    item_id: "",
    image: null,
    propertys: [],
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "name_ku":
      return "ناوی کوردی";
    case "name_ar":
      return "ناوی عرەبی";
    case "name_turkey":
      return "ناوی تورکی";
    case "name_en":
      return "ناوی ئینگلیزی";
    case "category_id":
      return "جۆر";
    case "item_id":
      return "جۆری خواردن لە کۆگا";
    case "price":
      return "نرخ";
    case "calories":
      return "کالۆری";
    case "description":
      return "کورتە";
    default:
      return name;
  }
}
