"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cashForm, cashFormType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { useQuery } from "@tanstack/react-query";
import { getAllCash } from "../../_lib";
import { LuLoaderCircle } from "react-icons/lu";
import React from "react";
import {
  addTransactionAction,
  transferTransactionAction,
} from "../../_actions";
import { toast } from "sonner";
import { LucideLoader2 } from "lucide-react";

function CashFrom() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allCash"],
    queryFn: getAllCash,
  });

  const form = useForm<cashFormType>({
    resolver: zodResolver(cashForm),
    defaultValues: {
      amount: 0,
      transaction_type: "deposit",
      description: "",
      cash_id: 0,
    },
  });
  const [pending, setPending] = React.useTransition();
  function onSubmit(data: cashFormType) {
    const transaction_type = data.transaction_type;
    const isTransfer = transaction_type === "1" || transaction_type === "2";
    const source = transaction_type === "2" ? 2 : 1;
    const destination = transaction_type === "1" ? 2 : 1;
    setPending(async () => {
      const result = isTransfer
        ? await transferTransactionAction({
            source,
            destination,
            amount: data.amount as number,
            note: data.description as string,
          })
        : await addTransactionAction({
            amount: data.amount as number,
            description: data.description as string,
            cash_id: data.cash_id as number,
            transaction_type: data.transaction_type as string,
          });
      if (result.success) {
        toast.success(result.message);
        refetch();
        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-background dark:bg-white/5 dark:border p-10 flex flex-col justify-center items-center animate-spin duration-300"
                >
                  <p className="text-softGray mb-2 animate-spin duration-300">
                    بری پارەی ناو
                  </p>
                  <p className="animate-spin duration-300 text-primary text-2xl">
                    {0}
                  </p>
                </div>
              ))
            : data?.data?.map((item) => (
                <div
                  key={item.cash_id}
                  className="rounded-3xl bg-background dark:bg-white/5 dark:border p-10 flex flex-col justify-center items-center"
                >
                  <p className="text-softGray mb-2">
                    بری پارەی ناو {item?.cash_name}
                  </p>
                  <p className="text-primary text-2xl">
                    {item?.amount?.toLocaleString()}
                  </p>
                </div>
              ))}
          <TextField
            control={form.control}
            name="amount"
            label=""
            placeholder="بڕی پارە"
            className="max-w-[315px] ml-auto"
          />
          <TextField
            control={form.control}
            name="description"
            label=""
            placeholder="تێبینی"
            className="max-w-[315px] ml-auto"
          />
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
          <div className="flex flex-col gap-4 col-span-2">
            <h1>دیاریکردنی ڕاکێشانی پارە:</h1>
            <FormField
              control={form.control}
              name="transaction_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-4 "
                      dir="rtl"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="deposit" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          زیادکردنی پارە بۆ قاسە
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="withdraw" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          کەم کردنی پارە لە قاسە
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          گواستنەوەی پارە لە قاسەی A بۆ قاسەی B
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          گواستنەوەی پارە لە قاسەی B بۆ قاسەی A
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="block max-w-[150px] w-full ms-auto mt-10"
        >
          {pending ? (
            <LucideLoader2 className="size-5 animate-spin flex justify-center items-center mx-auto" />
          ) : (
            "پەسند کردن"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default CashFrom;
