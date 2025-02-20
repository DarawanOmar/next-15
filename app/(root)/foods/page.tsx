import TitlePage from "@/components/layout/title-page";
import React, { Suspense } from "react";
import ModalAddFood from "./_components/form/modal-add-food";
import ReusableSelect from "@/components/reusable/reusable-select-component";
import FeedFood from "./_components/feed-food";
import { getAllCategory } from "../setting/_lib";
import SkelotonCard from "@/components/reusable/skeloton-card";
import DollarChanger from "@/components/reusable/dollar-changer";

async function Foods({ searchParams }: { searchParams: searchParamsType }) {
  const allCategory = await getAllCategory();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <TitlePage text="خواردنەکان" />
        <DollarChanger />
      </div>
      <div className="flex justify-end items-start gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <ReusableSelect
            queryName="category"
            options={[
              { value: "all", label: "هەموو" },
              ...(allCategory?.data?.map((category) => ({
                value: category.category_id.toString(),
                label: category.name_ku,
              })) || []),
            ]}
            defaultValue=""
            placeholder="جۆر"
            className="w-[125px]"
          />
        </Suspense>
        <ModalAddFood />
      </div>
      <div className=" my-10">
        <Suspense
          fallback={
            <SkelotonCard
              height="h-40 rounded-3xl"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-16"
            />
          }
        >
          <FeedFood searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default Foods;
