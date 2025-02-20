import { Button } from "@/components/ui/button";
import { PrintIcon } from "@/public/icons";
import { Ban, CheckCheck } from "lucide-react";
import React from "react";
import { cancleOrder, finishOrderAction } from "../../../_actions";
import ReusableDeleteDailog from "@/components/reusable/reusable-delete-dialog";
import PayMoneyTable from "./pay-money-table";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { UseFormReturn } from "react-hook-form";
import { orderFoodType } from "../../../_type";
import CustomDialog from "@/components/reusable/resusable-dialog";
import Invoice from "../invoice";

type Props = {
  order_id: string;
  note: string;
  discount_type: string;
  total_discount_amount: number;
  form: UseFormReturn<orderFoodType>;
};

function ButtonsSubmitForm({
  order_id,
  discount_type,
  note,
  total_discount_amount,
  form,
}: Props) {
  const [pendding, setPendding] = React.useTransition();
  const finishOrder = () => {
    const data = { discount_type, note, total_discount_amount };
    setPendding(async () => {
      const res = await finishOrderAction(order_id, data);
      if (res.success) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <div className="grid grid-cols-2 gap-5">
      <PayMoneyTable />
      <Button
        onClick={finishOrder}
        type="button"
        icon={pendding ? LuLoaderCircle : CheckCheck}
        iconPlacement="left"
      >
        داواکاریەکە تەواوکرا
      </Button>
      <ReusableDeleteDailog
        title="دڵنیای لە سڕینەوەی داواکاری"
        id={order_id}
        actionDelete={cancleOrder}
        isFreshButtonPass
        button={
          <Button
            type="button"
            icon={Ban}
            iconPlacement="left"
            className="bg-transparent border text-error hover:bg-error hover:text-white w-full"
            classIcon="text-error"
          >
            هەڵوەشاندنەوە
          </Button>
        }
      />
      <CustomDialog
        isFreshButtonPass
        button={
          <Button
            type="button"
            icon={PrintIcon}
            iconPlacement="left"
            className="bg-transparent border  text-foreground hover:bg-black hover:text-white w-full"
          >
            چاپکردن
          </Button>
        }
        title="چاپکردنی ئۆردەر "
        classContent="max-w-xl"
      >
        <Invoice />
      </CustomDialog>
    </div>
  );
}

export default ButtonsSubmitForm;
