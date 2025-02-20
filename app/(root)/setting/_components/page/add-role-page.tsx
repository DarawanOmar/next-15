import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddRole from "../from/add-role-form";
import DollarChanger from "@/components/reusable/dollar-changer";

function AddRolePage() {
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <TitlePage text="ڕێکخستنەکان" />
        <DollarChanger />
      </div>

      <div className="flex justify-normal items-start my-10">
        <Link
          href={"/setting/roles"}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={30} />
          زیادکردنی ئەرک
        </Link>
      </div>
      <div className="">
        <AddRole />
      </div>
    </div>
  );
}

export default AddRolePage;
