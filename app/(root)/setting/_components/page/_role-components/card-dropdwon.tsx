import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EditIcon, TrashIcon } from "@/public/icons";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { Role } from "../../../_type";
import { deleteRole } from "../../../_actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function DropdownMenuRole({ role }: { role: Role }) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="max-w-max  bg-background rounded-lg border-none p-0 ">
          <div className="">
            <Button
              effect={"shine"}
              type="submit"
              iconPlacement="right"
              icon={EditIcon}
              className="bg-transparent text-foreground w-full hover:text-white rounded-none rounded-t-xl"
              asChild
            >
              <Link href={`/setting/roles/add?id=${role.role_id}`}>
                گۆڕانکاری
              </Link>
            </Button>
            <hr className="border-gray" />
            <ReusableDeleteDailog
              title="دڵنیای لە سڕینەوەی ئەرک!"
              isFreshButtonPass
              button={
                <Button
                  effect={"shine"}
                  type="submit"
                  iconPlacement="right"
                  icon={TrashIcon}
                  className="bg-transparent text-foreground w-full hover:text-white rounded-none rounded-b-xl"
                >
                  سڕینەوە
                </Button>
              }
              actionDelete={deleteRole}
              id={role.role_id.toString()}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DropdownMenuRole;
