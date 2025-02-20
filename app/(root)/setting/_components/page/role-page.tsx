import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CardRole from "./_role-components/card-role";
import DollarChanger from "@/components/reusable/dollar-changer";

function RolePage() {
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <TitlePage text="ڕێکخستنەکان" />
        <DollarChanger />
      </div>
      <div className="flex justify-between items-center my-5">
        <Link
          href={"/setting"}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={30} />
          ئەرکەکان
        </Link>
        <Button asChild icon={PlusCircleIcon} iconPlacement="left">
          <Link href="/setting/roles/add">زیادکردنی ئەرک</Link>
        </Button>
      </div>
      <div className="my-10">
        <CardRole />
      </div>
    </div>
  );
}

export default RolePage;
