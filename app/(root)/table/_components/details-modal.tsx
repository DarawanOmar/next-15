import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { CircleAlert, CircleCheck, Lock } from "lucide-react";
import { getDetailReportTable } from "../_lib";

async function DetailsModal() {
  const tableReport = await getDetailReportTable();
  return (
    <CustomDialog
      classContent="max-w-md"
      isFreshButtonPass
      button={
        <div className="bg-table p-2 rounded-lg cursor-pointer dark:bg-white/5 dark:border ">
          <CircleAlert size={16} />{" "}
        </div>
      }
      title="زانیاری مێز"
    >
      <div className="grid grid-cols-2 gap-y-10 gap-x-10 max-w-sm mx-auto">
        <div className="flex gap-3 items-center">
          <div className="h-8 w-8 rounded-tr-full rounded-bl-full rounded-br-full bg-table"></div>
          <p>بەتاڵە</p>
          <p>{tableReport?.data?.available_table || 0}</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-8 w-8 rounded-tr-full rounded-bl-full rounded-br-full bg-primary"></div>
          <p>گیراوە</p>
          <p>{tableReport?.data?.reserve_table || 0}</p>
        </div>
        <div className="flex gap-3 items-center ">
          <div className="h-8 w-8 rounded-tr-full rounded-bl-full rounded-br-full bg-success"></div>
          <p>لە خواردندایە</p>
          <p>{tableReport?.data?.taken_table || 0}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Lock size={19} className="text-softGray " /> <p>مێزەکە گیراوە</p>
        </div>
      </div>
    </CustomDialog>
  );
}

export default DetailsModal;
