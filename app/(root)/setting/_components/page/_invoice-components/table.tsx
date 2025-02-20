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
import { ArrowBack } from "@/public/icons";
import Link from "next/link";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { deleteUser } from "@/app/(root)/employees/_actions";
import { InvoiceType } from "../../../[...slug]/page";
import { format } from "date-fns";
import CustomDialog from "@/components/reusable/resusable-dialog";
import ReturnItem from "../../from/return-item";

interface DataTableProps<TData, TValue> {
  data: TData[];
  havePagination?: boolean;
  totalPage?: number;
  currentPage?: number;
  pageSize?: number;
  type: InvoiceType;
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
  const purchase_invoice = [
    { accrossKey: "name", title: "ناو" },
    { accrossKey: "item_price", title: "نرخی کڕین" },
    { accrossKey: "invoice_id", title: " یەکە" },
    { accrossKey: "quantity", title: "بڕ" },
    { accrossKey: "created_at", title: " بەروار" },
  ];

  const expenses_invoice = [
    { accrossKey: "name", title: "ناو" },
    { accrossKey: "item_price", title: "نرخی کڕین" },
    { accrossKey: "invoice_id", title: "یەکە" },
    { accrossKey: "quantity", title: "بڕ" },
  ];
  const order_invoice = [
    { accrossKey: "name", title: "خواردن" },
    { accrossKey: "item_price", title: "نرخ" },
    { accrossKey: "invoice_id", title: "جۆر" },
  ];
  const columns: ColumnDef<any>[] = [];
  let selectedData;
  switch (type) {
    case "buy":
      selectedData = purchase_invoice;
      break;
    case "expense":
      selectedData = expenses_invoice;
      break;
    case "order":
      selectedData = order_invoice;
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
          const isDate = item.accrossKey === "created_at";
          if (isDate) {
            return <div>{format(new Date(value), "yyyy-MM-dd")}</div>;
          }
          return (
            <div>
              <Link href={`/debts/${row.original.purchases_number}`}>
                {isNumber ? value.toLocaleString() : value}
              </Link>
            </div>
          );
        },
      });
    });
  }

  columns.push({
    id: "actions",

    cell: function CellComponent({ row }) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen((prev) => !prev);
      const { invoice_item_id } = row.original;
      return (
        <div className="">
          <CustomDialog
            open={open}
            onOpenChange={setOpen}
            classContent="max-w-sm"
            title="دڵنیایت لە گەڕانەوەی ئایتم"
            isFreshButtonPass
            button={
              <button className="flex gap-2 items-center max-w-max hover:bg-none hover:text-white transition-all duration-500 p-2 rounded-b-lg w-full ">
                <ArrowBack height={17} />
              </button>
            }
          >
            <ReturnItem id={invoice_item_id} handleClose={handleClose} />
          </CustomDialog>
        </div>
      );
    },
  });

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
