import TitlePage from "@/components/layout/title-page";
import Search, { FallBackInput } from "@/components/reusable/search";
import React, { Suspense } from "react";
import { DataTable } from "@/components/reusable/table";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import column from "./expenses-components/column";
import DollarChanger from "@/components/reusable/dollar-changer";
import { getAllExpenses } from "../../_lib";
import ModalAddExpenses from "./expenses-components/modal-add-expense";

async function ExpensesPage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const page = Number((await searchParams).page) || 1;
  const allExpneses = await getAllExpenses("expense", page, "");
  console.log(allExpneses.data);
  return (
    <div className="my-5">
      <div className="flex justify-between items-center my-5">
        <TitlePage text="ڕێکخستنەکان" />
        <DollarChanger />
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center my-10 gap-5">
        <Link
          href={"/setting"}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={30} />
          خەرجییەکان
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <Suspense fallback={<FallBackInput />}>
            <Search palceHolder="خەرجی  " />
          </Suspense>
          <ModalAddExpenses />
        </div>
      </div>

      <div className="my-10">
        <DataTable
          data={allExpneses.data || []}
          columns={column}
          isSearch={false}
          currentPage={page}
          totalPage={2}
          havePagination={false}
        />
      </div>
    </div>
  );
}

export default ExpensesPage;
