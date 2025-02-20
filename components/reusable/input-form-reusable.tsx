import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  classFormItem?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  classFormItem,
  type = "text",
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", classFormItem)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              className={cn("", className)}
              {...field}
              type={type}
              isform
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
