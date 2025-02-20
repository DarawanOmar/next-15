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
import { SelectFormField } from "@/components/reusable/reusable-select";
import {
  addExpense,
  addExpenseType,
  addUser,
  addUserType,
} from "../../../_type";
import { addUserAction, updateUserAction } from "../../../client-action";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCash,
  getAllRolesActive,
  getTransactionSubject,
} from "../../../_lib";
import { addExpenseAction, updateExpenseAction } from "../../../_actions";
import { TextField } from "@/components/reusable/input-form-reusable";
import LoadingSelectSkeleton from "@/components/layout/loading-select-skeleton";
import { DatePickerForm } from "@/components/reusable/date-picker-form";

type filmFormProps = {
  isEdit?: boolean;
  info?: addExpenseType;
  handleClose?: () => void;
  id?: number;
};

export default function AddExpenses({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["transactionSubject"],
    queryFn: getTransactionSubject,
  });

  const { data: cash, isLoading: cashLoading } = useQuery({
    queryKey: ["allCash"],
    queryFn: getAllCash,
  });

  const [pendding, setPendding] = useTransition();
  const form = useForm<addExpenseType>({
    resolver: zodResolver(addExpense),
    defaultValues: getDefaultValues(info),
  });

  function onSubmit(values: addExpenseType) {
    setPendding(async () => {
      const result = isEdit
        ? await updateExpenseAction(id as number, values)
        : await addExpenseAction(values);
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
          <TextField
            control={form.control}
            name="subject"
            label="ناو"
            classFormItem="w-full"
          />
          {isLoading ? (
            <LoadingSelectSkeleton form={form.control} />
          ) : (
            <SelectFormField
              control={form.control}
              name="cash_id"
              label={"قاسە"}
              placeholder="قاسە هەڵبژێرە"
              options={
                cash?.data?.map((item) => ({
                  value: item.cash_id.toString(),
                  label: item.cash_name,
                })) || []
              }
              isForm
            />
          )}
          {isLoading ? (
            <LoadingSelectSkeleton form={form.control} />
          ) : (
            <SelectFormField
              control={form.control}
              name="subject"
              label={"جۆر"}
              placeholder="جۆر هەڵبژێرە"
              options={
                data?.data?.map((subject) => ({
                  value: subject.name,
                  label: subject.name,
                })) || []
              }
              isForm
            />
          )}

          <TextField
            control={form.control}
            name="amount"
            label="نرخ"
            classFormItem="w-full"
          />

          <TextField
            control={form.control}
            name="qunaity"
            label="دانە"
            classFormItem="w-full"
          />

          <DatePickerForm
            control={form.control}
            name="custom_date"
            label="بەروار"
            className="w-full"
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

const getDefaultValues = (values: Partial<addExpenseType> = {}) => {
  const defaultValues: addExpenseType = {
    subject: "",
    transaction_type: "expense",
    amount: 0,
    cash_id: "",
    custom_date: new Date(),
    quantity: 0,
    description: "note",
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "full_name":
      return "ناو";
    case "email":
      return "ئیمەیڵ";
    case "password":
      return "وشەی نهێنی";
    case "role_id":
      return "ڕۆڵ";
    default:
      return name;
  }
}
