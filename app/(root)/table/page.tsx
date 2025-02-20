import TitlePage from "@/components/layout/title-page";
import React, { Suspense } from "react";
import Floor from "./_components/floor";
import ModalAddTable from "./_components/form/modal-add-table";
import { Button } from "@/components/ui/button";
import { Meal } from "@/public/icons";
import DetailsModal from "./_components/details-modal";
import Link from "next/link";
import FeedTable from "./_components/feed-table";
import SkelotonCard from "@/components/reusable/skeloton-card";
import DollarChanger from "@/components/reusable/dollar-changer";

async function TablePage({ searchParams }: { searchParams: searchParamsType }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitlePage text="مێزەکان" />
        <DollarChanger />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 my-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Floor />
        </Suspense>
        <div className="flex gap-3 items-center max-sm:w-full">
          <DetailsModal />
          <Button
            iconPlacement="left"
            icon={Meal}
            classIcon=""
            className="bg-transparent border border-primary text-primary max-sm:w-full max-sm:text-xs"
            asChild
          >
            <Link href={"/table/order-food"}>داواکردنی خواردن</Link>
          </Button>
          <ModalAddTable />
        </div>
      </div>
      <Suspense
        fallback={
          <SkelotonCard height="h-32 rounded-3xl" className="2xl:grid-cols-5" />
        }
      >
        <FeedTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default TablePage;
