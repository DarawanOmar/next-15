import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import foodStore, {
  decreaseListOrderQty,
  increaseListOrderQty,
  removeListOrderFood,
  SelectedFood,
} from "../../order-food-store";
import { useSnapshot } from "valtio";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { orderAdd, payOrder } from "../../_actions";
import { toast } from "sonner";
import { EditIcon } from "@/public/icons";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { LuLoaderCircle } from "react-icons/lu";
import { OneOrder } from "../../_type";

type Props = {
  order_list: OneOrder;
};

function DonedOrder({ order_list }: Props) {
  React.useEffect(() => {
    foodStore.listOrderFood = order_list?.order_item?.map((item) => ({
      food_id: item.food_id,
      name: item.food_name,
      image: item.image,
      price: item.sale_price,
      addQuantity: item.remain_quantity,
      qunaity: item.remain_quantity,
      order_item_id: item.order_item_id,
      properties: [],
    }));
    foodStore.totalPriceListOrder = order_list?.total_amount;
  }, [order_list]);

  const { listOrderFood, totalPriceListOrder } = useSnapshot(foodStore);
  const [payPendding, setPayPendding] = React.useTransition();
  const [pendding, setPendding] = React.useTransition();
  const [selectQty, setSelectQty] = React.useState<number>(0);
  const [editOrder, setEditOrder] = useQueryState("editOrder", {
    defaultValue: "",
    clearOnDefault: true,
    shallow: false,
  });
  return (
    <div className="my-5 grid gap-2">
      <div className="flex justify-between ">
        <p className="text-lg mb-5">لیستی داواکارییە جێبەجێ کراوەکان</p>
        {/* Edit Button */}
        <Button
          type="button"
          icon={EditIcon}
          onClick={() => {
            if (editOrder === "edit") {
              setEditOrder("");
              return;
            }
            setEditOrder("edit");
          }}
          iconPlacement="left"
          className=" text-softGray p-0 h-6 bg-transparent hover:bg-transparent hover:text-softGray"
        ></Button>
      </div>{" "}
      {listOrderFood?.length === 0 ? (
        <div className="text-center my-5 text-error">
          هیچ داواکاریەک جێبەجێ نەکراوە لە ئێستادا
        </div>
      ) : (
        listOrderFood?.map((food, index) => (
          <div
            key={food.food_id}
            className="relative  p-4 border border-primary rounded-md   hover:bg-primary15 transition-all duration-300 cursor-pointer"
          >
            {/* Shown Each Of the Order Item */}
            <div className="flex justify-between items-center ">
              <div className="flex gap-4">
                <CustomDialog
                  title="پارەدان"
                  classContent="max-w-[400px]"
                  isFreshButtonPass
                  button={
                    <div>
                      <Image
                        src={
                          food.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${food.image}`
                            : "/logo.png"
                        }
                        alt={food.name}
                        width={60}
                        height={60}
                        className="rounded-full h-[60px] w-[60px] object-cover"
                      />
                    </div>
                  }
                >
                  {/* Pay Per Quantity */}
                  <div className="">
                    <p className="text-center font-sirwan_meduim text-lg">
                      دەتەوێت پارەی چەند دانە بدەیت ؟{" "}
                    </p>
                    <div className="grid grid-cols-5 place-items-center mx-auto gap-5 max-w-xs my-8">
                      {Array.from({ length: food.addQuantity })?.map(
                        (_, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <Checkbox
                              onCheckedChange={() => setSelectQty(index + 1)}
                              checked={selectQty === index + 1}
                              id={(index + 1).toString()}
                              className="rounded-full h-5 w-5"
                            />
                            <label
                              htmlFor={(index + 1).toString()}
                              className="text-sm mt-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {index + 1}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        setPayPendding(async () => {
                          const res = await payOrder(
                            String(order_list.order_id),
                            food.order_item_id as number,
                            selectQty
                          );
                          if (res.success) {
                            toast.success(res.success);
                            setSelectQty(0);
                          } else {
                            toast.error(res.message);
                          }
                        });
                      }}
                      className="block max-w-[280px] w-full mx-auto "
                    >
                      {payPendding ? (
                        <LuLoaderCircle className="animate-spin transition-all duration-500 mx-auto" />
                      ) : (
                        "پارەدان"
                      )}
                    </Button>
                  </div>
                </CustomDialog>
                <div className="flex flex-col justify-start items-start gap-3">
                  <p>{food.name}</p>
                  <div className="flex gap-3 items-center">
                    <button
                      disabled={!editOrder}
                      onClick={() => increaseListOrderQty(food.food_id)}
                      type="button"
                      className="bg-softGray text-table p-1  rounded-full disabled:cursor-not-allowed"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                    <p>{food.addQuantity}</p>
                    <button
                      disabled={!editOrder}
                      onClick={() => decreaseListOrderQty(food.food_id)}
                      type="button"
                      className="bg-softGray text-table p-1  rounded-full disabled:cursor-not-allowed"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-lg">
                  <span>IQD</span>
                  <p>{food.price.toLocaleString()}</p>
                </div>
                <p className="text-success bg-successSoft rounded-2xl text-center max-w-max mx-auto px-2 py-0.5 text-xs">
                  جێبەجێ کرا
                </p>
              </div>
              <button
                disabled={!editOrder}
                onClick={() => removeListOrderFood(food.food_id)}
                type="button"
                className="absolute -top-2 -right-2 bg-table text-primary p-1  rounded-full disabled:cursor-not-allowed"
              >
                <X size={13} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))
      )}
      <Button
        type="button"
        onClick={() => {
          setPendding(async () => {
            const result = await orderAdd(
              String(order_list.order_id),
              {
                options: [],
                note: "note",
              },
              listOrderFood as SelectedFood[]
            );
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          });
        }}
        className={cn("max-w-xs mx-auto my-4", {
          hidden: !editOrder,
        })}
      >
        {pendding ? (
          <LuLoaderCircle className="animate-spin transition-all duration-500" />
        ) : (
          "جێبەجێکردنی گۆڕانکاری"
        )}
      </Button>
      <div className="flex justify-between items-center">
        <p className="text-softGray">کۆی گشتی</p>
        <div className="flex items-center gap-1 text-lg">
          <span>IQD</span>
          <p>{totalPriceListOrder?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DonedOrder;
