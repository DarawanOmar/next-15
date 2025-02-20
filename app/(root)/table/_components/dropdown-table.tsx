"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React from "react";
import CustomDialog from "@/components/reusable/resusable-dialog";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import { ArchiveIcon, EditIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { deleteProduct } from "../../warehouse/_actions";
import AddTable from "./form/add-table";
import { CircleCheck } from "lucide-react";
import { Table } from "../_type";
import { deleteTableAction, reserveTableAction } from "../_actions";

type Props = {
  table: Table;
};

function TableDropdown({ table }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const hahandleOpenAddNewItem = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-2 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="absolute top-1 right-1 cursor-pointer">
              <HiOutlineDotsVertical className="h-5 w-5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-3 rounded-xl flex flex-col justify-start items-end w-full"
          >
            <CustomDialog
              open={isOpen}
              onOpenChange={setOpen}
              icon={EditIcon}
              text_button="گۆڕانکاری"
              className="bg-transparent text-foreground hover:text-white rounded-none rounded-t-xl w-full"
              classContent="max-w-sm"
              iconPlacement="right"
              title="گۆڕانکاری"
            >
              <AddTable isEdit handleClose={hahandleOpenAddNewItem} id={1} />
            </CustomDialog>
            <Separator />
            <ReusableDeleteDailog
              title="دڵنیای لە ئەرشیفکردنی بەرهەم !"
              isFreshButtonPass
              button={
                <Button
                  effect={"shine"}
                  type="submit"
                  iconPlacement="right"
                  icon={ArchiveIcon}
                  className="bg-transparent text-foreground w-full hover:text-white rounded-none rounded-y-xl gap4"
                >
                  ئەرشیفکردن
                </Button>
              }
              actionDelete={deleteTableAction}
              id={table.table_id.toString()}
            />
            {/* <ModalReserverTable /> */}
            <ReusableDeleteDailog
              title="دڵنیای لە گرتنی ئەم مێزە !"
              isFreshButtonPass
              button={
                <Button
                  effect={"shine"}
                  type="submit"
                  iconPlacement="right"
                  icon={CircleCheck}
                  className="bg-transparent text-foreground  hover:text-white rounded-none rounded-b-xl gap-5 "
                >
                  گرتنی مێز
                </Button>
              }
              actionDelete={reserveTableAction}
              id={table.table_id.toString()}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default TableDropdown;
