import * as React from "react";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType | LucideIcon | React.ElementType;
  classParent?: string;
  isform?: boolean;
  sizeIcon?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, classParent, type, Icon, isform, sizeIcon = 21, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative wfull", classParent)}>
        {Icon && (
          <span className="absolute start-2 inset-y-0 flex items-center">
            <Icon
              size={sizeIcon}
              className={cn("text-primary ms-1", {
                "size-7": type === "file",
              })}
            />
          </span>
        )}
        <input
          {...props}
          ref={ref}
          type={type}
          value={props.value === 0 ? "" : props.value}
          className={cn(
            "flex h-10 w-full rounded-xl border border-soft_red bg-gray  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-softGray placeholder:text-softGray",
            { "ps-10": Icon },
            {
              "bg-[#F2F2F2] dark:bg-black/10 dark:border dark:border-primary rounded-xl  ":
                isform,
            },
            className
          )}
          onChange={(e) => {
            if (type === "number" && props.onChange) {
              props.onChange({
                target: { value: Number(e.target.valueAsNumber) },
              } as any);
            } else {
              props.onChange && props.onChange(e);
            }
          }}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
