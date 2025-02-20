"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DebtsIconsSideBar,
  Desk,
  Employer,
  Expenses,
  FoodIcon,
  Home,
  Purchase,
  Report,
  Setting,
  Wearhouse,
} from "@/public/icons";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      dir="rtl"
      {...props}
      className="!font-sirwan_reguler  !rounded-l-2xl dark:rounded-none "
    >
      <SidebarHeader className="bg-white dark:bg-background rounded-tl-2xl dark:rounded-none border-l border-primary relative">
        <div className="absolute top-10 -end-2 p1 bg-white rounded-md cursor-pointer dark:bg-black/15 hover:text-primary transition-all duration-300">
          <PanelLeft onClick={toggleSidebar} size={17} />
        </div>
        <TeamSwitcher isHead={false} />
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-background border-l border-primary  !font-sirwan_reguler ">
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-white dark:bg-background rounded-bl-2xl dark:rounded-none border-l border-primary">
        <TeamSwitcher isHead />
      </SidebarFooter>
    </Sidebar>
  );
}
const data = {
  projects: [
    {
      title: "سەرەکی",
      url: "/main",
      icon: Home,
      isActive: true,
    },
    {
      title: "مێز",
      url: "/table",
      icon: Desk,
      isActive: true,
    },
    {
      title: "خوادنەکان",
      url: "/foods",
      icon: FoodIcon,
      isActive: true,
    },
    {
      title: "کۆگا",
      url: "/warehouse",
      icon: Wearhouse,
      isActive: true,
    },
    {
      title: "کڕین",
      url: "/purchase",
      icon: Purchase,
      isActive: true,
    },
    {
      title: "خەرجی رۆژ",
      url: "/daliy-expenses",
      icon: Expenses,
      isActive: true,
    },

    {
      title: "قەرزەکان",
      url: "/debts",
      icon: DebtsIconsSideBar,
      isActive: true,
    },
    {
      title: "کارمەندەکان",
      url: "/employees",
      icon: Employer,
      isActive: true,
    },
    {
      title: "ڕاپۆرت",
      url: "/report",
      icon: Report,
      isActive: true,
    },
    {
      title: "ڕێکخستنەکان",
      url: "/setting",
      icon: Setting,
      isActive: true,
    },
  ],
};
