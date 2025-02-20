import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { LoansType, OneLoan } from "./type";

export const getAllLoans = async (type: string, name: string, page: number) => {
  const result = await apiRequest<LoansType>({
    method: "GET",
    url: EndPoints.loans.getAllLoans(type, name, page),
  });

  return result;
};
export const getOneLoan = async (id: number) => {
  const result = await apiRequest<OneLoan>({
    method: "GET",
    url: EndPoints.loans.getOneLoan(id),
  });

  return result;
};
