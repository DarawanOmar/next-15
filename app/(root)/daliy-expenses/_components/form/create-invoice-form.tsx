"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, LucideLoader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuCirclePlus } from "react-icons/lu";
import React from "react";
import {
  createInvoiceExpensesDaily,
  createInvoiceExpensesDailyType,
} from "../../_type";
import { DatePickerForm } from "@/components/reusable/date-picker-form";
import { addExpensesInvoice } from "../../_actions";
import { toast } from "sonner";

export function CreateInvoiceExpenseDaily() {
  const form = useForm<createInvoiceExpensesDailyType>({
    resolver: zodResolver(createInvoiceExpensesDaily),
    defaultValues: {
      date: new Date(),
    },
  });
  const [pendding, startTransication] = React.useTransition();

  function onSubmit(data: createInvoiceExpensesDailyType) {
    startTransication(async () => {
      const response = await addExpensesInvoice(data);
      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 sm:grid-cols-2 max-sm:w-full sm:max-w-md gap-5 "
      >
        <DatePickerForm
          control={form.control}
          name="date"
          className="w-full 2xl:w-[210px]"
          label=""
        />
        <Button
          disabled={pendding}
          iconPlacement="left"
          className=" rounded-xl bg-transparent border border-primary text-primary"
          icon={pendding ? LucideLoader2 : LuCirclePlus}
        >
          {pendding ? "" : "زیادکردنی پسووڵە"}
        </Button>
      </form>
    </Form>
  );
}
