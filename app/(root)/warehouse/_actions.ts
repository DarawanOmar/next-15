"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { addProductType } from "./_type";

export async function deleteProduct(id: string) {
  const result = await apiRequest({
    url: EndPoints.warehouse.deleteItem(+id),
    method: "DELETE",
  });
  return result;
}

export const deleteProductAction = async (id: string) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.warehouse.deleteItem(+id),
  });
  return result;
};
