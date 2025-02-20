"use client";
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
import { SelectFormField } from "@/components/reusable/reusable-select";
import { addTable, addTableType } from "../../_type";
import { addTableAction, updateTableAction } from "../../_actions";
import { toast } from "sonner";

type filmFormProps = {
  isEdit?: boolean;
  info?: addTableType;
  handleClose?: () => void;
  id?: number;
};

export default function AddTable({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const [pendding, setPendding] = useTransition();
  const form = useForm<addTableType>({
    resolver: zodResolver(addTable),
    defaultValues: getDefaultValues(info),
  });

  function onSubmit(values: addTableType) {
    setPendding(async () => {
      const result = isEdit
        ? await updateTableAction(id as number, values)
        : await addTableAction(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="  px-6">
        <div className="grid grid-cols-1 gap-10">
          <FormField
            control={form.control}
            name={"table_number"}
            render={({ field }) => {
              return (
                <FormItem className=" w-full  max-w-full">
                  <FormLabel>{labelTranslate(field.name)}</FormLabel>
                  <FormControl>
                    <Input
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

          <SelectFormField
            control={form.control}
            name="floar"
            label={labelTranslate("floar")}
            placeholder="نهۆم هەڵبژێرە"
            options={floarOption}
            isForm
          />

          {isEdit ? (
            <>
              <SelectFormField
                control={form.control}
                name="status"
                label={labelTranslate("status")}
                placeholder="ڕۆڵ هەڵبژێرە"
                options={emailOptions}
                isForm
              />
            </>
          ) : null}
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

const floarOption = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];
const emailOptions = [
  { value: "m@example.com", label: "m@example.com" },
  { value: "m@google.com", label: "m@google.com" },
  { value: "m@support.com", label: "m@support.com" },
];

const getDefaultValues = (values: Partial<addTableType> = {}) => {
  const defaultValues: addTableType = {
    table_number: "",
    floar: "",
    status: "",
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "table_number":
      return "ژمارەی مێزە";
    case "floar":
      return "نهۆم";
    case "status":
      return "بار";
    default:
      return name;
  }
}
