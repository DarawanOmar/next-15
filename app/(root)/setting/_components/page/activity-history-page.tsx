import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { DataTable } from "@/components/reusable/table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import column from "./_activity-history-page/column";
import DollarChanger from "@/components/reusable/dollar-changer";
import { getAllActiviaty } from "../../_lib";

async function ActivityHistoryPage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const page = Number((await searchParams).page) || 1;
  // const allActivity = await getAllActiviaty(page);
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <TitlePage text="ڕێکخستنەکان" />
        <DollarChanger />
      </div>
      <div className="flex justify-normal items-start my-10">
        <Link
          href={"/setting"}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={30} />
          مێژووی چالاکییەکان
        </Link>
      </div>
      <DataTable
        data={[
          {
            id: 1,
            money: "500,000",
            type: "کاش",
            belongto: "ئەمانەت",
            to: "هەولێر",
            debt: "0",
            createdAt: "2025-2-12",
          },
        ]}
        columns={column}
        isSearch={false}
      />
    </div>
  );
}

export default ActivityHistoryPage;
