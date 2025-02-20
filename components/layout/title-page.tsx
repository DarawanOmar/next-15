import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

function TitlePage({ text, className }: Props) {
  return (
    <div>
      <h1
        className={cn(
          "flex items-center gap-2 text-xl text-foreground font-sirwan_meduim mb-3",
          className
        )}
      >
        {text}
      </h1>
    </div>
  );
}

export default TitlePage;
