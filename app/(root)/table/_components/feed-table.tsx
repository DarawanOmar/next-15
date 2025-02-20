import React from "react";
import { getAllTable, getOneOrder } from "../_lib";
import TableDropdown from "./dropdown-table";
import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyImage from "@/components/reusable/empty-image";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { EditIcon } from "@/public/icons";
import AddTable from "./form/add-table";

async function FeedTable({ searchParams }: { searchParams: searchParamsType }) {
  const page = Number((await searchParams).page) || 1;
  const floar = Number((await searchParams).floar) || 0;

  const allTable = await getAllTable(floar, page);
  // console.log(allTable.data);
  if (allTable.data?.length === 0) {
    return <EmptyImage />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 my-10">
      {allTable?.data?.map((table, index) => (
        <div
          key={index}
          className="bg-white dark:bg-white/5 dark:border rounded-xl p-4 relative"
        >
          <div
            className={cn(
              "absolute top-0 left-0 h-11 w-11 rounded-tr-full rounded-bl-full rounded-br-full bg-success",
              {
                "bg-table": table.table_status === "available",
                "bg-success": table.table_status === "taken",
                "bg-primary": table.table_status === "booked",
              }
            )}
          >
            <span className="text-white  flex justify-center items-center mt-2.5">
              {table.table_number}
            </span>
          </div>

          <TableDropdown table={table} />
          <Link href={`/table/${table.table_id}`}>
            <div className="flex justify-center items-center text-lg gap-1 mt-12 mb-5">
              <span>IQD</span>
              <p>{table?.remain_amount?.toLocaleString()} </p>
            </div>
          </Link>
          <div className="flex justify-start items-start">
            {table.table_status === "booked" ? (
              <div className=" flex  gap-1">
                <Lock size={14} className="text-softGray mt-[1px]" />
                <p dir="ltr" className="text-sm ">
                  {new Date(table.updated_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedTable;
