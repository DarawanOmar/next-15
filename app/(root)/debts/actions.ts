"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { payMoneyType } from "./type";

export const loanReciveAction = async (
  partie_id: number,
  data: payMoneyType
) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.loans.reciveLoan,
    data: {
      partie_id,
      paid_amount: data.paid_amount,
    },
  });
  return result;
};
export const loanGiveAction = async (partie_id: number, data: payMoneyType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.loans.giveLoan,
    data: {
      partie_id,
      paid_amount: data.paid_amount,
    },
  });
  return result;
};
