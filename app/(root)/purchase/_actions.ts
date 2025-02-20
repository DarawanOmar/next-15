"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { addProductType } from "./_type";

export const addItemInvoice = async (
  invoice_id: number,
  data: addProductType
) => {
  const dataToSend = {
    item_id: data.item_id,
    invoice_id,
    quantity: data.quantity,
    total_price: data.total_price,
    expiration_date: data.expiration_date,
  };
  console.log("Data => ", dataToSend);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.invoice.addItemInvoice,
    data: dataToSend,
  });
  return result;
};
export const deleteEmptyInvoice = async (id: string) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.invoice.deleteInvoice(+id),
  });
  return result;
};
export const deleteItemInvoice = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.invoice.deleteItemInvoice(id),
  });
  return result;
};
export const finishInvoice = async (id: number) => {
  console.log("ID => ", id);
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.invoice.finishInvoice(id),
  });
  return result;
};
