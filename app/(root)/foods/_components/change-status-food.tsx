"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { changeStatusFoodAction } from "../_actions";
import { toast } from "sonner";

type Props = {
  id: number;
  sold_out: boolean;
};

function ChangeStatusFood({ id, sold_out }: Props) {
  const [pendding, setPendding] = React.useTransition();
  const handleChange = (e: boolean) => {
    setPendding(async () => {
      const result = await changeStatusFoodAction(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <div className="flex items-center gap-4 mt-3">
      <Switch
        checked={sold_out}
        onCheckedChange={handleChange}
        disabled={pendding}
      />
      <p>{sold_out ? "بەردەستە نییە" : "بەردەستە"}</p>
    </div>
  );
}

export default ChangeStatusFood;
