import TitlePage from "@/components/layout/title-page";
import { DataTable } from "@/components/reusable/table";
import TotalShown from "@/components/reusable/total-shown";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import column from "../_components/column";
import DollarChanger from "@/components/reusable/dollar-changer";
import { getOneLoan } from "../_lib";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function OneSupplierInvoice({ params }: Props) {
  const id = Number((await params).id);
  const loans = await getOneLoan(id);
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <TitlePage text="قەرزەکان" />
        <DollarChanger />
      </div>
      <div className="flex justify-between items-center my-10">
        <div className="flex justify-between items-center my-5">
          <Link
            href={"/debts"}
            className="font-sirwan_meduim flex items-center gap-1 max-sm:text-lg text-lg hover:text-dark_blue transition-all duration-500"
          >
            <ChevronRight size={25} />
            {loans.data?.name || ""}
          </Link>
        </div>
        <TotalShown
          text="کۆی گشتی قەرزەکان"
          total={
            loans?.data?.payments?.reduce(
              (acc, curr) => acc + curr.amount,
              0
            ) || 0
          }
        />
      </div>
      <DataTable
        isSearch={false}
        havePagination={false}
        data={loans?.data?.payments || []}
        columns={column}
      />
    </div>
  );
}

export default OneSupplierInvoice;
