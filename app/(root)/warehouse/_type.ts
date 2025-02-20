import { sizeImage } from "@/lib/globals";
import { z } from "zod";

export const addProduct = z.object({
  name: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.coerce.number().optional(),
  fare_price_per_item: z.coerce.number().optional(),
  item_category_id: z.string().optional(),
  expiration_date: z.date().optional(),
  unit: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size < sizeImage, {
      message: "File size must be less than 1.5MB",
    })
    .nullable(),
});

export type addProductType = z.infer<typeof addProduct>;

export interface Item {
  item_id: number;
  name: string;
  barcode: string;
  image: string;
  unit: string;
  added_by: number;
  active: boolean;
  item_category_id: number;
  created_at: string;
  updated_at: string;
  inventorys: Array<{
    quantity: number;
    expiration_date: string;
    fare_price_per_item: number;
  }>;

  expiration_date: string;
  category_name: string;
  quantity: number;
  multiple: boolean;
  total_amount: number;
}
