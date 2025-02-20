"use client";

import * as React from "react";
import { MonitorCog } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TeamSwitcher({ isHead }: { isHead: boolean }) {
  const { open } = useSidebar();

  return isHead ? (
    <>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-primary data-[state=open]:text-sidebar-accent-foreground flex items-center"
      >
        <div
          className={cn(
            "flex aspect-square h-[36px] w-[36px] items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground",
            {
              "size-8": !open,
            }
          )}
        >
          <Image
            src="/avan2.png"
            alt="Kalar-Store"
            height={300}
            width={300}
            quality={100}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-start">ئاڤانە سۆفت</span>

          <span className="truncate text-xs">ڕێستۆرانت سیستەم</span>
        </div>
        <MonitorCog className="mr-auto " />
      </SidebarMenuButton>
    </>
  ) : (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <Image
            src="/logo.png"
            alt="Logo-Restaurant"
            height={20}
            width={30}
            className="rounded-full object-cover mx-auto"
          />
          <p
            className={cn("", {
              hidden: !open,
            })}
          >
            شکار ڕێستۆرانت
          </p>
        </div>
      </div>
    </>
  );
}
