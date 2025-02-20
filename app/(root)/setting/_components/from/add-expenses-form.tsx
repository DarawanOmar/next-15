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
import { SelectFormField } from "@/components/reusable/reusable-select";
import { DatePickerForm } from "@/components/reusable/date-picker-form";
import { addExpenses, addExpensesType } from "../../_type";
import { addExpnesesAction, updateExpnesesAction } from "../../_actions";

type filmFormProps = {
  isEdit?: boolean;
  info?: addExpensesType;
  handleClose?: () => void;
  id?: number;
};

export default function AddExpenses({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const [pendding, setPendding] = useTransition();
  const form = useForm<addExpensesType>({
    resolver: zodResolver(addExpenses),
    defaultValues: getDefaultValues(info),
  });

  function onSubmit(values: addExpensesType) {
    setPendding(async () => {
      const result = isEdit
        ? await updateExpnesesAction(id as number, values)
        : await addExpnesesAction(values);
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
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
          {Object.entries(form.getValues())
            .slice(0, 3)
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

          <SelectFormField
            control={form.control}
            name="category"
            label={"جۆر "}
            placeholder="جۆر  هەڵبژێرە"
            options={salaryPaymentOption}
            isForm
          />
          <DatePickerForm control={form.control} name="date" label="بەروار" />
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

const salaryPaymentOption = [
  { value: "weekly", label: "هەفتانە" },
  { value: "monthly", label: "مانگانە" },
  { value: "yearly", label: "ساڵانە" },
];

const getDefaultValues = (values: Partial<addExpensesType> = {}) => {
  const defaultValues: addExpensesType = {
    name: "",
    price: "",
    qunatity: "",
    category: "",
    date: new Date(),
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "name":
      return "ناو";
    case "qunatity":
      return "دانە";
    case "price":
      return "نرخ";
    default:
      return name;
  }
}
