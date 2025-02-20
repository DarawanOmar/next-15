"use client";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import React from "react";

type Props = {
  className?: string;
};

function DebtButtons({ className }: Props) {
  const [floors, setFloors] = useQueryState("type", {
    clearOnDefault: true,
    defaultValue: "we_owed_them",
    shallow: false,
  });
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={() => setFloors("we_owed_them")}
        className={cn(
          "border-b border-transparent pb-1 transition-all duration-300",
          {
            " border-primary": floors === "we_owed_them",
          }
        )}
      >
        قەرزی ئەوان
      </button>
      <button
        onClick={() => setFloors("they_owed_us")}
        className={cn(
          "border-b border-transparent pb-1 transition-all duration-300",
          {
            " border-primary": floors === "they_owed_us",
          }
        )}
      >
        قەرزی ئێمە
      </button>
      <button
        onClick={() => setFloors("guest")}
        className={cn(
          "border-b border-transparent pb-1 transition-all duration-300",
          {
            " border-primary": floors === "guest",
          }
        )}
      >
        میوان
      </button>
    </div>
  );
}

export default DebtButtons;
