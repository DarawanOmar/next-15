import TitlePage from "@/components/layout/title-page";
import Search, { FallBackInput } from "@/components/reusable/search";
import React, { Suspense } from "react";
import ModalAddUser from "./_components/form/modal-add-employees";
import { DataTable } from "@/components/reusable/table";
import column from "./_components/column";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { getAllEmployee } from "./_lib";
import DollarChanger from "@/components/reusable/dollar-changer";

async function UserPage({ searchParams }: { searchParams: searchParamsType }) {
  const page = Number((await searchParams).page) || 1;
  const name = (await searchParams).search || "";
  const allEmployee = await getAllEmployee(name as string, page);
  return (
    <div className="mb-5">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
        <TitlePage text="کارمەندەکان" />
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-5 lg:max-w-xl max-sm:w-full">
          <DollarChanger />
          <Suspense fallback={<FallBackInput />}>
            <Search palceHolder="ناو  " />
          </Suspense>
          <ModalAddUser />
        </div>
      </div>
      <div className="my-10">
        <DataTable
          data={allEmployee.data || []}
          columns={column}
          havePagination={false}
          isSearch={false}
          currentPage={page}
          totalPage={2}
        />
      </div>
    </div>
  );
}

export default UserPage;
