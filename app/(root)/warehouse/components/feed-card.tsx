import React from "react";
import { getAllItem } from "../_lib";
import DropdwonFrom from "./card-dropdwon";
import Image from "next/image";
import { format } from "date-fns";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { TwoFace } from "@/public/icons";
import { TwoDate2 } from "./two-date";
import EmptyImage from "@/components/reusable/empty-image";
import { ButtonType } from "./row-buttons";

async function FeedCard({ searchParams }: { searchParams: searchParamsType }) {
  const page = Number((await searchParams).page) || 1;
  const state = (await searchParams).q || "";
  const search = (await searchParams).search || "";
  const category = Number((await searchParams).category) || 0;
  const allItems = await getAllItem(
    category,
    page,
    state as ButtonType,
    search as string
  );
  // console.log(allItems.data);
  if (allItems.data?.length === 0) {
    return <EmptyImage />;
  }

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:px-6 gap-4 lg:gap-4 my-10">
      {allItems?.data?.map((item) => (
        <div
          key={item.item_id}
          className="rounded-xl shadow-sm  p-4  border bg-white dark:bg-white/5 relative  "
        >
          <CustomDialog
            classContent="md:max-w-[30rem]"
            title="کاڵای دووبەروار"
            isFreshButtonPass
            button={
              <button className="absolute top-2 right-0 to text-softGray  rounded-md p-2 ">
                <TwoFace />
              </button>
            }
            isWithouTrigger={state === "multiple" ? false : true}
          >
            <TwoDate2 data={item.inventorys} />
          </CustomDialog>
          <DropdwonFrom item={item} />
          <div className="m-3">
            <Image
              src={
                item.image
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`
                  : "/logo.png"
              }
              alt={item.name}
              height={150}
              width={150}
              priority
              className="rounded-full object-cover cursor-pointer  border-4  mx-auto border-primary size-28"
            />
          </div>{" "}
          <div className="flex pt-3 flex-col gap-1 justify-center items-center">
            <span>{item.name}</span>
            <span className="text-primary">{item.barcode}</span>
          </div>
          <hr className="w-[200px] mx-auto my-3" />
          <div className="flex flex-col justify-start items-start gap-2 mx-4">
            <div className="flex  gap-1 *:text-sm items-center">
              <span className="text-muted-foreground">جۆر : </span>
              <span className="text-muted-foreground/80">
                {item.category_name}
              </span>
            </div>
            <div className="flex  gap-1 *:text-sm items-center">
              <span className="text-muted-foreground"> بەسەرچوون : </span>
              <span className="text-muted-foreground/80">
                {format(new Date(item?.created_at), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
          <hr className="w-[200px] mx-auto my-3" />
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1 *:text-sm items-center">
              <span className="text-muted-foreground">بڕ</span>
              <span className="text-muted-foreground/80">{item.quantity}</span>
            </div>
            <div className="flex flex-col gap-1 *:text-sm items-center">
              <span className="text-muted-foreground">یەکە</span>
              <span className="text-muted-foreground/80">{item.unit}</span>
            </div>
            <div className="flex flex-col gap-1 *:text-sm items-center">
              <span className="text-muted-foreground">کڕین</span>
              <span className="text-muted-foreground/80">
                {item.inventorys.length > 0
                  ? item?.inventorys[0].fare_price_per_item?.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }
                    )
                  : 0}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedCard;
