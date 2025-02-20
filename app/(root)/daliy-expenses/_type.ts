import { z } from "zod";
import {
  optional_number,
  optional_string,
  required_number,
} from "../purchase/_type";

export const createInvoiceExpensesDaily = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});
export type createInvoiceExpensesDailyType = z.infer<
  typeof createInvoiceExpensesDaily
>;

export const expensesWarehouse = z.object({
  barcode: optional_string,
  name: optional_string,
  quantity: optional_number,
  amount: optional_number,
  item_id: optional_number,
});
export type expensesWarehouseType = z.infer<typeof expensesWarehouse>;

export const totalExpenses = z.object({
  amount: optional_number,
  name: optional_string,
  quantity: required_number,
});
export type totalExpensesType = z.infer<typeof totalExpenses>;
