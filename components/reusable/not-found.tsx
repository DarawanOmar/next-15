import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Empty from "@/public/not-found.svg";

function NotFound({
  height = 300,
  width = 300,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) {
  return (
    <Image
      src={Empty}
      alt="Empty"
      width={width}
      height={height}
      className={cn("mx-auto pt-24", className)}
    />
  );
}

export default NotFound;
