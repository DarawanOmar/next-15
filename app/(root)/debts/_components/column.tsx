"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/reusable/data-table-column-header";
import { OneLoan } from "../type";

const column: ColumnDef<OneLoan["payments"][0]>[] = [
  {
    accessorKey: "loan_payment_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ژمارەی وەسڵ" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="کۆی گشتی" />
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="کۆتا کاتی پارەدان" />
    ),
    cell: function CellComponent({ row }) {
      return <div>{format(row.original.updated_at, "yyyy-M-d")}</div>;
    },
  },
];

export default column;
