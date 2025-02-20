"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { specailProfitForm, specailProfitFormType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import React from "react";
import { toast } from "sonner";
import { addSpecailTransactionAction } from "../../_actions";
import { LucideLoader2 } from "lucide-react";
import { DatePickerForm } from "@/components/reusable/date-picker-form";

function SpecailsForm() {
  const form = useForm<specailProfitFormType>({
    resolver: zodResolver(specailProfitForm),
    defaultValues: {
      bread: "",
      tea: "",
      custom_date: new Date(),
    },
  });
  const [pending, setPending] = React.useTransition();
  function onSubmit(data: specailProfitFormType) {
    setPending(async () => {
      const result = await addSpecailTransactionAction({
        amount: Number(data.bread) + Number(data.tea),
        custom_date: data.custom_date as Date,
        description: "قازانجی چا و نان",
        transaction_type: "profit",
      });
      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5 my-10">
          <DatePickerForm
            control={form.control}
            name="custom_date"
            label={"بەروار"}
            className="w-full"
          />
          <TextField
            control={form.control}
            name="tea"
            label="قازانجی چا"
            className="max-w-[315px] ml-auto"
          />
          <TextField
            control={form.control}
            name="bread"
            label="قازانجی نان"
            className="max-w-[315px] ml-auto"
          />
        </div>
        <Button type="submit" className="w-full  ">
          {pending ? (
            <LucideLoader2 className="size-5 animate-spin flex justify-center items-center mx-auto" />
          ) : (
            " پەسند کردن"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SpecailsForm;
