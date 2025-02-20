import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import React, { useEffect } from "react";

interface SelectFormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  isForm?: boolean;
  isLabel?: boolean;
  className?: string;
  isSearchQuery?: boolean;
}

export const SelectFormField: React.FC<SelectFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  options,
  defaultValue,
  isForm,
  isLabel = true,
  className,
  isSearchQuery,
}) => {
  const [urlValue, setUrlValue] = useQueryState(name, {
    shallow: false,
    clearOnDefault: true,
    defaultValue: defaultValue as string,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        useEffect(() => {
          if (isSearchQuery && urlValue) {
            field.onChange(urlValue);
          }
        }, []);

        return (
          <FormItem>
            {isLabel && <FormLabel>{label}</FormLabel>}
            <Select
              dir="rtl"
              onValueChange={(newValue) => {
                field.onChange(newValue);
                if (isSearchQuery) {
                  setUrlValue(newValue);
                }
              }}
              value={isSearchQuery ? urlValue || field.value : field.value}
              defaultValue={defaultValue}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "rounded-xl",
                    {
                      "bg-[#F2F2F2] dark:bg-white/5 dark:border text-softGray":
                        isForm,
                    },
                    className
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
