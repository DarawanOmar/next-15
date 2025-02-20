import TitlePage from "@/components/layout/title-page";
import Search, { FallBackInput } from "@/components/reusable/search";
import React, { Suspense } from "react";
import ModalAddProduct from "./components/form/modal-add-product";
import RowButtons from "./components/row-buttons";
import FeedCard from "./components/feed-card";
import CustomDialog from "@/components/reusable/resusable-dialog";
import Info from "./components/info";
import { CircleAlert } from "lucide-react";
import SkelotonCard from "@/components/reusable/skeloton-card";
import { getAllCategoryItem } from "../setting/_lib";
import DollarChanger from "@/components/reusable/dollar-changer";

async function WarehousePage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const all_item_category = await getAllCategoryItem();
  return (
    <div className="mb-5">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <TitlePage text="کۆگا" />
        <div className="grid grid-cols-2 max-sm:w-full sm:flex gap-5 items-center">
          <CustomDialog
            classContent="md:max-w-[30rem]"
            title="زانیاری"
            isFreshButtonPass
            button={
              <button className="text-softGray bg-white rounded-md p-2">
                <CircleAlert size={18} />
              </button>
            }
          >
            <Info />
          </CustomDialog>
          <DollarChanger />
          <Suspense fallback={<FallBackInput />}>
            <Search palceHolder="ناو یان باڕکۆد" className="max-sm:w-full " />
          </Suspense>
          <ModalAddProduct />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RowButtons categoryItem={all_item_category?.data || []} />
      </Suspense>
      <Suspense
        fallback={
          <SkelotonCard
            height="h-80 rounded-3xl"
            className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:px-6 gap-4 lg:gap-4 my-10"
          />
        }
      >
        <FeedCard searchParams={searchParams} />
      </Suspense>
      {/* <PaginatedComponent currentPage={page} totalPages={2} /> */}
    </div>
  );
}
export default WarehousePage;
