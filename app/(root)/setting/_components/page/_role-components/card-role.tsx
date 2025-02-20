import React from "react";
import { getAllRolesActive } from "../../../_lib";
import EmptyImage from "@/components/reusable/empty-image";
import DropdownMenuRole from "./card-dropdwon";

async function CardRole() {
  const getRoles = await getAllRolesActive();
  if (getRoles.data?.length === 0) return <EmptyImage />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {getRoles?.data?.map((role, index) => (
        <div
          className="bg-white dark:bg-black dark:border rounded-3xl p-5"
          key={index}
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-sirwan_meduim">{role.name}</p>
            <DropdownMenuRole role={role} />
          </div>
          <p className="my-3 text-softGray dark:text-white">
            {role.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CardRole;
