import React from "react";
import { getDetailReportItem } from "../_lib";

async function Info() {
  const getItemReport = await getDetailReportItem();
  return (
    <div className="font-sirwan_thin px-16 pb-10 pt-5 flex flex-col gap-4">
      <div className="bg-muted rounded-xl border w-full flex flex-col gap-1 py-2 text-center">
        <h1 className="text-muted-foreground tracking-[1px]">
          ژامارەی جۆری بەرهەکان
        </h1>
        <span className="text-primary font-bold text-xl">
          {getItemReport.data?.total_quantity?.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) || 0}
        </span>
      </div>
      <div className="bg-muted rounded-xl border w-full flex flex-col gap-1 py-2 text-center">
        <h1 className="text-muted-foreground tracking-[1px]">
          کۆی گشتی بەرهەم (کڕین)
        </h1>
        <span className="text-primary font-bold text-xl">
          {getItemReport.data?.total_amount?.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) || 0}
        </span>
      </div>
    </div>
  );
}

export default Info;
