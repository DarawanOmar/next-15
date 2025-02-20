"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/reusable/data-table-column-header";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { deleteUser } from "@/app/(root)/employees/_actions";
import { PrintIcon, TrashIcon } from "@/public/icons";
import { InvoiceType } from "@/app/(root)/purchase/_type";

const column: ColumnDef<InvoiceType["data"][0]>[] = [
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ژمارەی وەسڵ" />
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بڕی پارە" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="جۆر" />
    ),
  },
  {
    accessorKey: "added_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="لەلایەن" />
    ),
  },
  {
    accessorKey: "partie_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بۆ" />
    ),
  },
  {
    accessorKey: "invoice_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="قەرزی ماوە" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بەروار" />
    ),
    cell: function CellComponent({ row }) {
      return <div>{format(row.original.created_at, "yyyy-M-d")}</div>;
    },
  },
  {
    id: "actions",
    cell: function CellComponent({ row }) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen((prev) => !prev);
      const { invoice_id } = row.original;
      return (
        <div className="flex items-center gap-2">
          <ReusableDeleteDailog
            title="دڵنیایت لە سڕینەوەی یایتم"
            isFreshButtonPass
            button={
              <button className="bg-[#DC26260D] text-error p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-500">
                <TrashIcon height={18} width={18} />
              </button>
            }
            actionDelete={deleteUser}
            id={invoice_id.toString()}
          />
          <button className="bg-table p-2 rounded-full hover:bg-gray-500 hover:text-white max-w-max">
            <PrintIcon height={20} width={20} />
          </button>
        </div>
      );
    },
  },
];

export default column;
