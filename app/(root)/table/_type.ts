import { z } from "zod";

export const addTable = z.object({
  table_number: z.string().min(1, { message: "ژمارەی مێز داخڵ بکە" }),
  floar: z.string().min(1, { message: "نهۆم داخڵ بکە" }),
  status: z.string().optional(),
});

export type addTableType = z.infer<typeof addTable>;

export const bookingTable = z.object({
  date: z.date({ required_error: "بەروار هەڵبژێرە" }).optional(),
  time: z.string().optional(),
});

export type bookingTableType = z.infer<typeof bookingTable>;

export const orderFood = z.object({
  order_type: z.string().optional(),
  note: z.string().optional(),
  options: z.array(z.string()),
  table_number: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  discount_dinar: z.string().optional(),
  discount_percentage: z.string().optional(),
  partie_id: z.string().optional(),
  employee_id: z.string().optional(),
});

export type orderFoodType = z.infer<typeof orderFood>;

export interface Table {
  table_id: number;
  table_number: number;
  table_status: "booked" | "available" | "taken";
  floar: number;
  order_id: number;
  added_by: number;
  created_at: string;
  updated_at: string;
  remain_amount: number;
}

export interface OneOrder {
  order_id: number;
  added_by: number;
  received_by: number;
  canceled_by: number;
  status: "pending";
  order_type: "normal";
  partie_id: number;
  discount_type: string;
  total_remain_amount: number;
  total_paid_amount: number;
  total_discount_amount: number;
  total_amount: number;
  employee_id: number;
  note: string;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  order_item: OrderItem[];
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  food_id: number;
  quantity: number;
  sale_price: number;
  sale_total: number;
  paid_quantity: number;
  remain_quantity: number;
  created_at: string;
  updated_at: string;
  food_name: string;
  image: string;
}
