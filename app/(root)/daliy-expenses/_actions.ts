"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { createInvoiceExpensesDailyType, expensesWarehouseType } from "./_type";

export const addItemExpensesInvoice = async (
  invoice_id: number,
  data: expensesWarehouseType
) => {
  const dataSend = {
    invoice_id: invoice_id,
    subject: data.name,
    quantity: data.quantity,
    amount: data.amount,
  };
  console.log("Data Send", dataSend);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.invoice.addItemExpensesInvoice,
    data: dataSend,
  });
  return result;
};

export const deleteItemExpensesInvoice = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.invoice.deleteItemExpensesInvoice(id),
  });
  return result;
};

export const addExpensesInvoice = async (
  data: createInvoiceExpensesDailyType
) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.invoice.addInvoice,
    data: {
      type: "expense",
      payment_type: "cash",
      date: data.date,
    },
  });

  return result;
};
