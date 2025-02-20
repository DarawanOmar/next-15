"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginatedComponent from "@/components/reusable/pagination";
import { DataTableColumnHeader } from "@/components/reusable/data-table-column-header";
import { PayMoney } from "@/public/icons";
import CustomDialog from "@/components/reusable/resusable-dialog";
import PayForm from "./form/pay-form";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  data: TData[];
  havePagination?: boolean;
  totalPage?: number;
  currentPage?: number;
  pageSize?: number;
  type: "we_owed_them" | "they_owed_us" | "guest";
}

export function DataTable<TData, TValue>({
  data,
  havePagination = true,

  currentPage,
  totalPage,
  pageSize,
  type,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const they_owed_us = [
    { accrossKey: "name", title: "ناو" },
    { accrossKey: "phone", title: "ژ.مۆبایل" },
    { accrossKey: "amount_owed_to_Us", title: " قەرزی ئێمە" },
    // { accrossKey: "amount_we_owed_them", title: "پارەی دراو" },
    { accrossKey: "updated_at", title: " کۆتا کاتی پارەدان" },
  ];

  const we_owed_them = [
    { accrossKey: "name", title: "ناو" },
    { accrossKey: "phone", title: "ژ.مۆبایل" },
    { accrossKey: "amount_we_owed_them", title: "پارەی قەرز" },
    { accrossKey: "updated_at", title: " کۆتا کاتی پارەدان" },
  ];

  const guest = [
    { accrossKey: "name", title: "ناو" },
    { accrossKey: "phone", title: "ژ.مۆبایل" },
    { accrossKey: "total_amount", title: "بڕی پارە" },
    { accrossKey: "created_at", title: " بەروار" },
  ];
  const columns: ColumnDef<any>[] = [];
  let selectedData;
  switch (type) {
    case "they_owed_us":
      selectedData = they_owed_us;
      break;
    case "we_owed_them":
      selectedData = we_owed_them;
      break;
    case "guest":
      selectedData = guest;
      break;
  }

  if (selectedData) {
    selectedData.forEach((item) => {
      columns.push({
        id: item.accrossKey,
        accessorKey: item.accrossKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={item.title} />
        ),
        cell: ({ row }) => {
          const value = row.original[item.accrossKey];
          const isNumber = typeof value === "number";
          return (
            <div>
              <Link href={`/debts/${row.original.partie_id}`}>
                {isNumber ? value.toLocaleString() : value}
              </Link>
            </div>
          );
        },
      });
    });
  }

  if (type !== "guest") {
    columns.push({
      id: "actions",
      cell: function CellComponent({ row }) {
        const [open, setOpen] = React.useState(false);
        const handleClose = () => setOpen((prev) => !prev);
        const { partie_id, name, amount_we_owed_them, amount_owed_to_Us } =
          row.original;
        return (
          <CustomDialog
            open={open}
            onOpenChange={setOpen}
            text_button="پارەدان"
            icon={PayMoney}
            classContent="max-w-md"
            iconPlacement="left"
            className="bg-white text-foreground rounded-full"
            title="پارەدان"
          >
            <PayForm
              handleClose={handleClose}
              partie_id={partie_id}
              info={{
                name,
                total:
                  type === "we_owed_them"
                    ? amount_we_owed_them
                    : amount_owed_to_Us,
              }}
              isOwnedThem={type === "we_owed_them" ? true : false}
            />
          </CustomDialog>
        );
      },
    });
  }
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: pageSize || 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md p-2 border font-sans dark:border-white/5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-white/5">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-primary  text-center   "
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:border-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className=" text-center font-sirwan_reguler "
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {havePagination && (
        <div className="my-5">
          <PaginatedComponent
            currentPage={currentPage || 1}
            totalPages={totalPage || 1}
          />
        </div>
      )}
    </div>
  );
}
