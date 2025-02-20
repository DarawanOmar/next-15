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
import { payMoney, payMoneyType } from "../../type";
import { loanGiveAction, loanReciveAction } from "../../actions";

type filmFormProps = {
  isEdit?: boolean;
  info?: {
    total: number;
    name: string;
  };
  isOwnedThem: boolean;
  handleClose?: () => void;
  partie_id?: number;
};

export default function PayForm({
  isOwnedThem,
  info,
  handleClose,
  partie_id,
}: filmFormProps) {
  const [pendding, setPendding] = useTransition();
  const form = useForm<payMoneyType>({
    resolver: zodResolver(payMoney),
    defaultValues: { paid_amount: 0, discount: 0 },
  });

  function onSubmit(values: payMoneyType) {
    setPendding(async () => {
      const result = isOwnedThem
        ? await loanGiveAction(partie_id as number, values)
        : await loanReciveAction(partie_id as number, values);
      if (result.success) {
        toast.success(result.message);
        handleClose && handleClose();
      } else {
        toast.error(result.message);
      }
    });
  }
  const discount = (form.watch("discount") as number) || 0;
  const amount = (form.watch("paid_amount") as number) || 0;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  px-6">
        <div className=" p-6 rounded-3xl bg-background flex flex-col justify-center items-center gap-6 mt-5">
          <p className="text-2xl text-primary font-sirwan_meduim">
            {info?.name}
          </p>
          <p className="text-softGray">کۆی گشتی قەرز</p>
          <p className="bg-primary15 dark:text-black rounded-full px-4 py-2">
            {info?.total?.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 mt-10">
          {Object.entries(form.getValues()).map(([key, value]) => (
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
          <div className="grid gap-1">
            <p>کۆی گشتی</p>
            <div className="bg-[#F2F2F2] dark:bg-black/10 dark:border p-2.5 rounded-xl ">
              {(amount - discount).toLocaleString()}
            </div>
          </div>
        </div>

        <div className=" max-w-lg mx-auto gap-16 w-full mt-16 mb-6 flex  justify-between items-center ">
          <Button type="submit" className="w-full py-[23px]">
            {pendding ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : (
              "پەسەندکردن"
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

function labelTranslate(name: string) {
  switch (name) {
    case "paid_amount":
      return "بڕی پارە";
    case "discount":
      return "داشکاندن";
    default:
      return name;
  }
}
