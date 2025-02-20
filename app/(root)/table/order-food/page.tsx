import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import CategoryFood from "./_components/category-food";
import FeedFood from "./_components/food-feed";
import ShownOrder from "./_components/form/shown-order";
import { getAllCategory } from "../../setting/_lib";
import { getOneOrder } from "../_lib";
import { OneOrder } from "../_type";
import DollarChanger from "@/components/reusable/dollar-changer";

type Props = {
  searchParams: searchParamsType;
};

async function OrderFood({ searchParams }: Props) {
  const category_id = Number((await searchParams).category_id) || 0;
  const table_id = (await searchParams).table_number || "";
  const order_list = await getOneOrder(table_id as string);
  const category = await getAllCategory();
  console.log("Table ID => ", table_id);
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <TitlePage text="مێزەکان" />
        <DollarChanger />
      </div>
      <div className="flex justify-between items-center my-5">
        <Link
          href={"/table"}
          className="font-sirwan_meduim flex items-center gap-1 max-sm:text-lg text-lg hover:text-dark_blue transition-all duration-500"
        >
          <ChevronRight size={25} />
          داواکردنی خواردن
        </Link>
      </div>
      <div className="flex flex-col  lg:flex-row gap-5 max-md:w-full">
        <div className="flex flex-col gap-10 w-full max-h-max">
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryFood categorey={category?.data || []} />
          </Suspense>
          <FeedFood category_id={category_id} />
        </div>
        <div className="max-lg:max-w-full lg:max-w-[460px] max-lg:mx-auto  w-full bg-white dark:bg-white/5 dark:border rounded-xl p-5 border max-h-max">
          <ShownOrder
            is_order_page
            order_list={order_list.data || ({} as OneOrder)}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderFood;
