import TitlePage from "@/components/layout/title-page";
import React, { Suspense } from "react";
import DebtButtons from "./_components/buttons-debts";
import Search from "@/components/reusable/search";
import TotalShown from "@/components/reusable/total-shown";
import { DataTable } from "./_components/table";
import { getAllLoans } from "./_lib";
import DollarChanger from "@/components/reusable/dollar-changer";

type Props = {
  searchParams: Promise<{
    page: string;
    type: "they_owed_us" | "we_owed_them" | "guest";
    search: string;
  }>;
};

async function DebtsPage({ searchParams }: Props) {
  const page = Number((await searchParams).page) || 1;
  const name = (await searchParams).search || "";
  const type = (await searchParams).type || "we_owed_them";
  const allLoans = await getAllLoans(type, name, page);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <TitlePage text="قەرزەکان" />
        <DollarChanger />
      </div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center my-10 max-sm:gap-10">
        <Suspense fallback={<div>Loading...</div>}>
          <DebtButtons className="max-sm:grid max-sm:grid-cols-2 max-sm:gap-10" />
        </Suspense>
        <div className="grid grid-cols-2 max-sm:gap-10 gap-4">
          <Search />
          <TotalShown
            text="کۆی گشتی قەرزەکان"
            total={allLoans?.data?.total_loan || 0}
          />
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          type={type}
          data={allLoans?.data?.loans || []}
          havePagination={false}
          currentPage={page}
          totalPage={2}
        />
      </div>{" "}
    </div>
  );
}

export default DebtsPage;
