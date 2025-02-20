import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  className?: string;
  total: number | string;
};

function TotalShown({ text = "کۆی گشتی", className, total }: Props) {
  return (
    <div className={cn("", className)}>
      <div
        className={cn(
          "bg-white dark:bg-white/5 dark:border py-1 px-4 text-foreground flex flex-col items-center border rounded-xl"
        )}
      >
        <span className="text-xs">{text}</span>
        {typeof total === "string" ? (
          <div className="text-xs ">{total}</div>
        ) : (
          <div className="flex gap-1 text-xs text-primary font-sirwan_bold ">
            <span>IQD</span>
            {Number(total).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default TotalShown;
