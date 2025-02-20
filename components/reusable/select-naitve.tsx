import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectProps {
  label?: string;
  placeholder: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  isLabel?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export const SimpleSelect: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  defaultValue,
  isLabel = true,
  className,
  onChange,
}) => {
  return (
    <div className="w-full grid gap-2">
      {isLabel && <label htmlFor={placeholder}>{label}</label>}
      <Select dir="rtl" onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger
          className={cn(
            "rounded-xl bg-[#F2F2F2] dark:bg-white/5 dark:border ",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
