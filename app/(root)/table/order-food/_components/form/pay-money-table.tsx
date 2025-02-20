import CustomDialog from "@/components/reusable/resusable-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PayIcon } from "@/public/icons";
import React from "react";
import { useSnapshot } from "valtio";
import foodStore from "../../../order-food-store";

function PayMoneyTable() {
  const { totalPriceListOrder } = useSnapshot(foodStore);
  const [money, setMoney] = React.useState<number>(0);
  return (
    <CustomDialog
      text_button="پارەدان"
      icon={PayIcon}
      iconPlacement="left"
      title="پارەدان"
      className="bg-transparent border border-primary text-primary"
      classContent="max-w-xl"
    >
      <div className="grid gap-5 mt-4">
        <div className="flex gap-3 items-center text-lg">
          <span className="text-softGray">کۆی گشتی : </span>
          <p className="bg-primary10 rounded-full p-2 px-5 font-sirwan_meduim">
            {totalPriceListOrder?.toLocaleString()}
          </p>
        </div>
        <Separator />
        <div className="grid gap-10">
          <div className="grid gap-3">
            <p className="text-softGray">بڕی پارەی وەرگیراو لە کڕیار وەربگرە</p>
            <div className="grid grid-cols-3 gap-5 max-w-xs">
              {moneyList.map((item) => (
                <Button
                  onClick={() => {
                    if (money === item) {
                      setMoney(0);
                      return;
                    }
                    setMoney(item);
                  }}
                  key={item}
                  className={cn(
                    "bg-primary10 text-black rounded-lg font-sirwan_meduim ",
                    {
                      "bg-primary text-white": money === item,
                    }
                  )}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 max-w-[300px] items-center">
            <p className="text-softGray">بڕی پارەی وەرگیراو:</p>
            <p className="bg-table text-softGray rounded-xl p-3 text-center">
              {money.toLocaleString()}
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-1 max-w-[300px] items-center">
          <p className="text-softGray ">بڕی پارەی باقی:</p>
          <p className="bg-table text-softGray rounded-xl text-center p-3">
            {(money - totalPriceListOrder)?.toLocaleString()}
          </p>
        </div>
        <Button className="max-w-[250px] py-6 w-full mx-auto mt-5">
          {/* پارەدانەک تەواو کرا */}
          داخستن
        </Button>
      </div>
    </CustomDialog>
  );
}

export default PayMoneyTable;

const moneyList = [250, 500, 1000, 5000, 10000, 25000, 50000, 60000, 100000];
