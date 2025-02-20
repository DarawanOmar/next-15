import TitlePage from "@/components/layout/title-page";
import React, { Suspense } from "react";
import { DatePickerWithRange } from "@/components/layout/date-picker-with-range";
import FeedCard from "./_components/feed-card";
import DollarChanger from "@/components/reusable/dollar-changer";
import ButtonsDayFillter from "../setting/_components/page/_invoice-components/buttons-day-fillter";

function ReportPage({ searchParams }: { searchParams: searchParamsType }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <TitlePage text="ڕاپۆرت" />
        <DollarChanger />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:flex  sm:justify-between sm:items-center my-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ButtonsDayFillter />
          <DatePickerWithRange
            className="max-sm:w-full"
            triggerClassName="max-sm:w-full"
          />
        </Suspense>
      </div>

      <FeedCard searchParams={searchParams} />
    </div>
  );
}

export default ReportPage;
