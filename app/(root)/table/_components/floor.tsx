"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import React from "react";

function Floor() {
  const [floors, setFloors] = useQueryState("floar", {
    clearOnDefault: true,
    shallow: false,
  });
  return (
    <div className="max-sm:grid max-sm:grid-cols-2 max-sm:w-full max-sm:gap-5 sm:flex sm:flex-wrap sm:items-center gap-3 ">
      <Button
        onClick={() => {
          if (floors === "1") {
            setFloors("");
          } else {
            setFloors("1");
          }
        }}
        className={cn(
          "bg-transparent border text-primary transition-all duration-300 max-sm:w-full",
          {
            "bg-primary text-white": floors === "1",
          }
        )}
      >
        نهۆمی یەکەم
      </Button>
      <Button
        onClick={() => {
          if (floors === "2") {
            setFloors("");
          } else {
            setFloors("2");
          }
        }}
        className={cn(
          "bg-transparent border text-primary transition-all duration-300 max-sm:w-full",
          {
            "bg-primary text-white": floors === "2",
          }
        )}
      >
        نهۆمی دووەم
      </Button>
    </div>
  );
}

export default Floor;
