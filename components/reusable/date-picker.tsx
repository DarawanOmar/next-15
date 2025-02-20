"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerFieldProps = {
  label?: string;
  description?: string;
  field: any;
  errorMessage?: string;
  className?: string;
};

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  description,
  field,
  errorMessage,
  className,
}) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3  font-normal flex justify-between items-center",
                !field.value && "text-muted-foreground",
                className
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>بەروار هەڵبژێرە</span>
              )}
              <CalendarIcon className=" h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </FormItem>
  );
};
