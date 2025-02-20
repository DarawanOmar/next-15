import TitlePage from "@/components/layout/title-page";
import Search, { FallBackInput } from "@/components/reusable/search";
import React, { Suspense } from "react";
import { DataTable } from "@/components/reusable/table";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import ModalAddUser from "./_user-components/modal-add-user";
import column from "./_user-components/column";
import { getAllUsers } from "../../_lib";
import EmptyImage from "@/components/reusable/empty-image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DollarChanger from "@/components/reusable/dollar-changer";

async function UserPageSetting({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const page = Number((await searchParams).page) || 1;
  const allUser = await getAllUsers();
  if (allUser.data?.length === 0) return <EmptyImage />;

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
          بەکارهێنەرەکان
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <Suspense fallback={<FallBackInput />}>
            <Search palceHolder="ناو  " />
          </Suspense>
          <ModalAddUser />
        </div>
      </div>

      <div className="my-10">
        <DataTable
          data={allUser.data || []}
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

export default UserPageSetting;
