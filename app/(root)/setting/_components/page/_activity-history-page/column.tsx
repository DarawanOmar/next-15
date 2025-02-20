"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/reusable/data-table-column-header";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { deleteUser } from "@/app/(root)/employees/_actions";
import { PrintIcon, TrashIcon } from "@/public/icons";

const column: ColumnDef<any>[] = [
  {
    accessorKey: "money",
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
    accessorKey: "belongto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="لەلایەن" />
    ),
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بۆ" />
    ),
  },
  {
    accessorKey: "debt",
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
      return <div>{format(row.original.createdAt, "yyyy-M-d")}</div>;
    },
  },
  {
    id: "actions",
    cell: function CellComponent({ row }) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen((prev) => !prev);
      const { id } = row.original;
      return (
        <ReusableDeleteDailog
          title="دڵنیایت لە سڕینەوەی یایتم"
          isFreshButtonPass
          button={
            <button className="bg-[#DC26260D] text-error p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-500">
              <TrashIcon height={18} width={18} />
            </button>
          }
          actionDelete={deleteUser}
          id={id}
        />
      );
    },
  },
];

export default column;
