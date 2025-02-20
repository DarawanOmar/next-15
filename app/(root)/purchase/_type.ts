import { sizeImage } from "@/lib/globals";
import { z } from "zod";

export const required_string = z.string().min(1, "خانەکە پڕ بکەوە");
export const required_number = z.coerce
  .number({ message: "تکایە ژمارە داخڵ بکە" })
  .min(1, "خانەکە پڕ بکەوە");
export const optional_number = z.coerce
  .number({
    message: "تکایە ژمارە داخڵ بکە",
  })
  .optional();
export const optional_string = z.string().optional();

export const createInvoiceShcema = z.object({
  payment_type: optional_string.default("Cash"),
  partie_id: optional_string,
  invoice_number: optional_string,
  supplier_name: optional_string,
  phone: optional_string,
  file: z
    .instanceof(File) // Ensure the value is of type `File`
    .refine((file) => file.size < sizeImage, {
      message: "File size must be less than 1.5MB",
    })
    .nullable(),
  date: z.date().optional(),
});

export type createInvoiceType = z.infer<typeof createInvoiceShcema>;

export const addProductSchema = z.object({
  barcode: optional_string,
  name: optional_string,
  quantity: optional_number,
  unit: optional_string,
  price: optional_number,
  expiration_date: z.date().optional(),
  item_id: optional_number,
  invoice_id: optional_number,
  total_price: optional_number,
});

export type addProductType = z.infer<typeof addProductSchema>;

export interface InvoiceType {
  total_pages: number;
  data: Invoice[];
}

export interface Invoice {
  invoice_id: number;
  payment_type: string;
  invoice_number: string;
  file: string;
  partie_id: number;
  added_by: number;
  date: string;
  type: string;
  total_amount: number;
  finished: boolean;
  created_at: string;
  updated_at: string;
}

export interface OneInvoice {
  invoice_id: number;
  payment_type: string;
  invoice_number: string;
  file: string;
  partie_id: number;
  added_by: number;
  date: string;
  type: string;
  total_amount: number;
  finished: boolean;
  partie_name: string;
  partie_phone: string;
  created_at: string;
  updated_at: string;
  invoice_item: Array<{
    invoice_item_id: number;
    item_id: number;
    quantity: number;
    item_price: number;
    total_price: number;
    expiration_date: string;
    invoice_id: number;
    added_by: number;
    created_at: string;
    updated_at: string;
    image: string;
    name: string;
  }>;
  invoice_expense: Array<{
    invoice_expense_id: number;
    subject: string;
    quantity: number;
    amount: number;
    invoice_id: number;
    added_by: number;
    created_at: string;
    updated_at: string;
  }>;
}

export interface SupplierOrCustomer {
  partie_id: number;
  name: string;
  phone: string;
  partie_type: string;
}
