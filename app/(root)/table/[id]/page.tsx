import Link from "next/link";
import TitlePage from "@/components/layout/title-page";
import ModalDollarUpdate from "@/components/reusable/modal-dollar-change";
import { ChevronRight } from "lucide-react";
import React, { Suspense } from "react";
import CategoryFood from "../order-food/_components/category-food";
import FeedFood from "../order-food/_components/food-feed";
import ShownOrder from "../order-food/_components/form/shown-order";
import { getAllCategory } from "../../setting/_lib";
import SkelotonCard from "@/components/reusable/skeloton-card";
import { getOneOrder } from "../_lib";
import { OneOrder } from "../_type";
import DollarChanger from "@/components/reusable/dollar-changer";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: searchParamsType;
};

async function OneTableOrder({ params, searchParams }: Props) {
  const table_id = (await params).id;
  const category_id = Number((await searchParams).category_id) || 0;
  const category = await getAllCategory();
  const order_list = await getOneOrder(table_id);
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
          مێزی ژمارە {table_id}
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-10 w-full max-h-max">
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryFood categorey={category?.data || []} />
          </Suspense>
          <Suspense
            fallback={
              <SkelotonCard
                height="h-44 rounded-3xl"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              />
            }
          >
            <FeedFood category_id={category_id} />
          </Suspense>
        </div>
        <div className="max-w-[435px] w-full bg-white dark:bg-white/5 dark:border rounded-xl p-5 border max-h-max">
          <ShownOrder
            is_order_page={false}
            table_id={+table_id}
            order_list={order_list?.data || ({} as OneOrder)}
          />
        </div>
      </div>
    </div>
  );
}

export default OneTableOrder;
