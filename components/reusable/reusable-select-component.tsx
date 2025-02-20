"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import React from "react";

interface ReusableSelectProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  queryName?: string;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  options,
  defaultValue = "",
  placeholder = "Select an option",
  className,
  queryName = "name",
}) => {
  const [name, setName] = useQueryState(queryName, {
    defaultValue: defaultValue,
    clearOnDefault: true,
    shallow: false,
  });

  React.useEffect(() => {
    if (name === "all") {
      setName("");
    }
  }, [name]);

  return (
    <Select onValueChange={setName} value={name} dir="rtl">
      <SelectTrigger className={cn("w-[180px] rounded-xl", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent dir="rtl">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ReusableSelect;
