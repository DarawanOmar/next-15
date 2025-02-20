import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { OneOrder, Table } from "./_type";

export const getAllTable = async (floar: number, page: number) => {
  const result = await apiRequest<Table[]>({
    method: "GET",
    url: EndPoints.table.getAllTable(floar, page),
  });

  return result;
};
export const getAllTablesWithoutFloar = async () => {
  const result = await apiRequest<Table[]>({
    method: "GET",
    url: EndPoints.table.getAllTableWithoutFloar,
  });

  return result;
};
export const getOneOrder = async (id: string) => {
  const result = await apiRequest<OneOrder>({
    method: "GET",
    url: EndPoints.order.getOneOrder(+id),
  });

  return result;
};
export const getDetailReportTable = async () => {
  const result = await apiRequest<{
    taken_table: number;
    available_table: number;
    reserve_table: number;
  }>({
    method: "GET",
    url: EndPoints.table.getReportTable,
  });

  return result;
};
