"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditIcon, MoreVertical, TrashIcon } from "lucide-react";
import React from "react";
import AddUser from "./form/add-employees";
import { DataTableColumnHeader } from "@/components/reusable/data-table-column-header";
import CustomDialog from "@/components/reusable/resusable-dialog";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { deleteEmployee, deleteUser } from "../_actions";
import { PayMoney } from "@/public/icons";
import PayEmployees from "./form/pay-empoyees";
import { Employee } from "../_type";

const column: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ناو"
        className="text-right"
      />
    ),
  },

  {
    accessorKey: "job_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="پیشە" />
    ),
  },

  {
    accessorKey: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="مووچە" />
    ),
    cell: function CellComponent({ row }) {
      const { salary } = row.original;
      return <div className="">{Number(salary)?.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "salary_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="جوری مووچە" />
    ),
  },
  {
    accessorKey: "hire_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بەرواری دەستبەکاربوون" />
    ),
    cell: function CellComponent({ row }) {
      const { hire_date } = row.original;
      return (
        <div className="">
          {new Date(hire_date).toLocaleDateString("en-US")}
        </div>
      );
    },
  },
  {
    id: "payment",
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="پارەدان" />
    ),
    cell: function CellComponent({ row }) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen((prev) => !prev);
      const { employee_id } = row.original;
      return (
        <CustomDialog
          open={open}
          onOpenChange={setOpen}
          text_button="پارەدان"
          icon={PayMoney}
          classContent="max-w-sm"
          iconPlacement="left"
          className="bg-white text-foreground rounded-full"
          title="پارەدان"
        >
          <PayEmployees id={employee_id} handleClose={handleClose} />
        </CustomDialog>
      );
    },
  },
  {
    id: "actions",
    cell: function CellComponent({ row }) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen((prev) => !prev);
      const { employee_id } = row.original;
      return (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-1" align="end">
              <DropdownMenuSeparator />
              <CustomDialog
                open={open}
                onOpenChange={setOpen}
                isFreshButtonPass
                title="گۆرانکاری"
                classContent="max-w-2xl"
                button={
                  <button className="flex gap-2 items-center font-sirwan_reguler  hover:bg-primary hover:text-white transition-all duration-500 p-2 rounded-t-lg w-full">
                    <EditIcon height={18} width={18} />
                    <span className="text-sm">گۆرانکاری</span>
                  </button>
                }
              >
                <AddUser id={employee_id} isEdit handleClose={handleClose} />
              </CustomDialog>
              <hr className="border-gray" />
              <ReusableDeleteDailog
                title="دڵنیایت لە سڕینەوەی کارمەند"
                isFreshButtonPass
                button={
                  <button className="flex gap-2 items-center font-sirwan_reguler  hover:bg-primary hover:text-white transition-all duration-500 p-2 rounded-b-lg w-full ">
                    <TrashIcon height={18} width={18} />
                    <span className="text-sm">سڕینەوە</span>
                  </button>
                }
                actionDelete={deleteEmployee}
                id={employee_id.toString()}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default column;
