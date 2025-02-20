import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { InvoiceType, OneInvoice, SupplierOrCustomer } from "./_type";
import { Item } from "../warehouse/_type";

export const getUnfinishInvoice = async (type: "buy" | "expense" = "buy") => {
  const result = await apiRequest<InvoiceType>({
    method: "GET",
    url: EndPoints.invoice.getAllInvoice(type, "", "", "", "false", 1),
  });

  return result;
};
export const getOneUnfinishInvoice = async (id: number) => {
  if (!id) return;
  const result = await apiRequest<OneInvoice>({
    method: "GET",
    url: EndPoints.invoice.getOneInvoice(id),
  });

  return result;
};
export const getSupplierOrCustomer = async (
  type: "supplier" | "customer" = "supplier"
) => {
  const result = await apiRequest<SupplierOrCustomer[]>({
    method: "GET",
    url: EndPoints.supplier_customer.getAllSupplierOrCustomer(type),
  });

  return result;
};
export const getItems = async (sreach: string) => {
  const result = await apiRequest<Item[]>({
    method: "GET",
    url: EndPoints.warehouse.getAllItemWithSearch(sreach),
  });

  return result;
};
