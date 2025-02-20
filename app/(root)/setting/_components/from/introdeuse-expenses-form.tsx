"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { introduseExpenses, introduseExpensesType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import { LucideLoader2, X } from "lucide-react";
import React from "react";
import { addTransactionSubjectAction } from "../../_actions";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getTransactionSubject } from "../../_lib";

function IntroduseExpenses() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["transactionSubject"],
    queryFn: getTransactionSubject,
  });

  const [pending, setPending] = React.useTransition();
  const form = useForm<introduseExpensesType>({
    resolver: zodResolver(introduseExpenses),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: introduseExpensesType) {
    setPending(async () => {
      const result = await addTransactionSubjectAction(data);
      if (result.success) {
        toast.success(result.message);
        form.reset();
        refetch();
      } else {
        toast.error(result.message);
      }
    });
  }
  if (isLoading) {
    return (
      <LucideLoader2 className="size-5 animate-spin flex justify-center items-center mx-auto" />
    );
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <TextField
            control={form.control}
            name="name"
            label="خەرجی"
            className="max-w-full"
          />
          <Button type="submit" className="w-full  ">
            {pending ? (
              <LucideLoader2 className="size-5 animate-spin flex justify-center items-center" />
            ) : (
              "زیادکردن"
            )}{" "}
          </Button>
        </form>
      </Form>
      <div className="my-10 grid grid-cols-1 gap-5">
        {data?.data?.length === 0 ? (
          <div className="text-error text-center my-5">
            هیچ داتایەک داخڵ نەکراوە
          </div>
        ) : (
          data?.data?.map((item) => (
            <div
              className="bg-table dark:bg-white/5 dark:border rounded-full p-4 w-full relative"
              key={item.transaction_subect_id}
            >
              {item.name}{" "}
              <div className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full">
                <X size={15} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default IntroduseExpenses;
