import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { Item } from "./_type";
import { ButtonType } from "./components/row-buttons";

export const getAllItem = async (
  category_id: number,
  page: number,
  state: ButtonType,
  search: string
) => {
  const result = await apiRequest<Item[]>({
    method: "GET",
    url: EndPoints.warehouse.getAllItem(category_id, page, state, search),
  });

  return result;
};

export const getDetailReportItem = async () => {
  const result = await apiRequest<{
    total_quantity: number;
    total_amount: number;
  }>({
    method: "GET",
    url: EndPoints.warehouse.getReportItem,
  });

  return result;
};
