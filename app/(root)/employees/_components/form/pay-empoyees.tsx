"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import { useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { payEmployees, payEmployeesType } from "../../_type";
import { DatePickerForm } from "@/components/reusable/date-picker-form";
import { TextField } from "@/components/reusable/input-form-reusable";
import { getAllCash } from "@/app/(root)/setting/_lib";
import { useQuery } from "@tanstack/react-query";
import LoadingSelectSkeleton from "@/components/layout/loading-select-skeleton";
import { payEmplooyeAction } from "../../_actions";

type filmFormProps = {
  isEdit?: boolean;
  info?: payEmployeesType;
  handleClose?: () => void;
  id?: number;
};

export default function PayEmployees({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allCash"],
    queryFn: getAllCash,
  });

  const [pendding, setPendding] = useTransition();
  const form = useForm<payEmployeesType>({
    resolver: zodResolver(payEmployees),
    defaultValues: {
      cash_id: "",
      start_date: new Date(),
      end_date: new Date(),
      amount: 0,
    },
  });

  function onSubmit(values: payEmployeesType) {
    setPendding(async () => {
      const result = await payEmplooyeAction(id as number, values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 px-6">
        <div className="">
          {isLoading ? (
            <LoadingSelectSkeleton form={form.control} />
          ) : (
            <SelectFormField
              control={form.control}
              name="cash_id"
              label={"قاسە"}
              placeholder="قاسە هەڵبژێرە"
              options={
                data?.data?.map((item) => ({
                  value: item.cash_id.toString(),
                  label: item.cash_name,
                })) || []
              }
              isForm
            />
          )}
        </div>

        <DatePickerForm
          control={form.control}
          name="start_date"
          label={"بەروار"}
          className="w-full"
        />
        <DatePickerForm
          control={form.control}
          name="end_date"
          label={"بەروار"}
          className="w-full"
        />

        <TextField
          control={form.control}
          name="amount"
          label="مووچە"
          classFormItem="w-full"
        />

        <div className=" max-w-lg mx-auto gap-16 w-full mt-5 mb-6 flex  justify-between items-center ">
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

const emailOptions = [
  { value: "1", label: "قاسەی A" },
  { value: "2", label: "قاسەی B" },
  { value: "3", label: "قاسەی C" },
];
