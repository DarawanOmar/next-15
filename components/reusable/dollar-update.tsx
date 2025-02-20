"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { MdDone } from "react-icons/md";
import { z } from "zod";
import LoadingButton from "@/components/ui/loadingButton";
import { DollarIcon, ExchangeArrow } from "@/public/icons";
import { updateCurrencyAction } from "@/app/(root)/setting/_actions";
import { toast } from "sonner";

export const dollarChange = z.object({
  USDrate: z.coerce
    .number({ message: "تکایە ژمارە داخڵ بکە" })
    .int()
    .min(1, { message: "بڕی پارە داخڵ بکە" }),
  IQDInput: z.coerce.number({ message: "تکایە ژمارە داخڵ بکە" }).int(),
  money: z.coerce.number({ message: "تکایە ژمارە داخڵ بکە" }).int(),
});

export type dollarChangeType = z.infer<typeof dollarChange>;

type Props = {
  info?: Partial<dollarChangeType>;
};

const DollarChangeAndCalculate = ({ info }: Props) => {
  const [pendding, startTransaction] = useTransition();
  const form = useForm<dollarChangeType>({
    resolver: zodResolver(dollarChange),
    defaultValues: getDefaultValues(info),
  });

  async function onSubmit(values: dollarChangeType) {
    console.log(values);
    startTransaction(async () => {
      const res = await updateCurrencyAction(values);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  const USDrate = form.watch("USDrate");

  // Handle Dollar input change
  const handleDollarChange = (value: string) => {
    const amount = parseFloat(value || "0");
    console.log("Dollar Change", amount);
    const convertedIQD = Math.round(amount * USDrate);
    form.setValue("money", amount);
    form.setValue("IQDInput", convertedIQD);
  };

  // Handle IQD input change
  const handleIQDChange = (value: string) => {
    const amount = parseFloat(value || "0");
    console.log("Dinar Change", amount);
    const convertedUSD = (amount / USDrate).toFixed(2);
    form.setValue("money", parseFloat(convertedUSD));
    form.setValue("IQDInput", amount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-10">
          <div className="grid grid-cols-1 gap-9">
            <FormField
              control={form.control}
              name="USDrate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نرخی دۆلار بە دینار</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="نرخی دۆلار بە دینار"
                      isform
                      className={cn("", {
                        "border-red-500 placeholder:text-red-500":
                          form.formState.errors["USDrate"],
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <LoadingButton
              loading={pendding}
              type="submit"
              className="flex gap-2"
            >
              تۆمارکردن
              <MdDone size={25} />
            </LoadingButton>
          </div>
          <div className="flex justify-between items-center mt-10">
            <div className="relative">
              <FormField
                control={form.control}
                name="money"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        isform
                        placeholder="نرخ"
                        onChange={(e) => {
                          field.onChange(e); // Update the field value
                          handleDollarChange(e.target.value); // Convert and update IQD
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute left-2 top-2.5 text-softGray">
                <DollarIcon />
              </div>
            </div>
            <ExchangeArrow />
            <div className="relative">
              <FormField
                control={form.control}
                name="IQDInput"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        isform
                        placeholder="نرخ"
                        onChange={(e) => {
                          field.onChange(e); // Update the field value
                          handleIQDChange(e.target.value); // Convert and update Dollar
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute left-2 top-2.5 text-softGray">
                <span>IQD</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DollarChangeAndCalculate;

const getDefaultValues = (values: Partial<dollarChangeType> = {}) => {
  const defaultValues: dollarChangeType = {
    USDrate: 0,
    IQDInput: 0,
    money: 0,
  };

  return { ...defaultValues, ...values };
};
