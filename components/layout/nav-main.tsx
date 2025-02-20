"use client";

import { LogOut, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { logout } from "@/lib/utils/cookies";
import { LuLoaderCircle } from "react-icons/lu";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | React.ElementType;
    isActive?: boolean;
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathName = usePathname();
  const [pendding, startTransition] = React.useTransition();
  const handleSignOut = () => {
    startTransition(async () => {
      logout();
    });
  };
  return (
    <SidebarGroup>
      <SidebarMenu className="!font-sirwan_reguler">
        {items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuButton
              key={item.title}
              tooltip={item.title}
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
              className={cn(
                "py-[18px] hover:bg-primary15 text-softGray hover:text-primary  transition-all duration-500 text-[15px]",
                {
                  "text-primary bg-primary15 dark:bg-primary dark:text-primary15 ":
                    pathName.includes(item.url),
                }
              )}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        ))}
        <SidebarMenuButton
          type="button"
          onClick={handleSignOut}
          tooltip="چوونەدەرەوە"
          className="py-[18px] text-softGray  hover:bg-primary hover:text-white  transition-all duration-500"
        >
          {pendding ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            <LogOut />
          )}

          <span> چوونەدەرەوە</span>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarGroup>
  );
}
