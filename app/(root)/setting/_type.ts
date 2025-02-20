import { z } from "zod";
import { required_number } from "../purchase/_type";
import { sizeImage } from "@/lib/globals";

export const cashForm = z.object({
  amount: z.coerce.number().optional(),
  transaction_type: z.string().optional(),
  description: z.string().optional(),
  cash_id: z.coerce.number().optional(),
});

export type cashFormType = z.infer<typeof cashForm>;

export const specailProfitForm = z.object({
  tea: z.string().min(1, "قازانجی چا نابێت بەترتی بێت"),
  bread: z.string().min(1, "قازانجی نان نابێت بەترتی بێت"),
  custom_date: z.date().optional(),
});

export type specailProfitFormType = z.infer<typeof specailProfitForm>;

export const introduseExpenses = z.object({
  name: z.string().min(1, "خەرجی نابێت بەترتی بێت"),
});

export type introduseExpensesType = z.infer<typeof introduseExpenses>;

export const foodNote = z.object({
  note: z.string().min(1, "تێبیبنی نابێت بەترتی بێت"),
});

export type foodNoteType = z.infer<typeof foodNote>;

export const addOptions = z.object({
  option_text: z.string().min(1, "زیادکردنی هەڵبژاردن نابێت بەتاڵ بێت"),
});

export type addOptionsType = z.infer<typeof addOptions>;

export const addQuestion = z.object({
  question_text: z.string().min(1, "زیادکردنی پرسیار نابێت بەتاڵ بێت"),
});

export type addQuestionType = z.infer<typeof addQuestion>;

export const typeFoodWarehouse = z.object({
  name: z.string().min(1, "جۆر نابێت بەتاڵ بێت"),
});
export type typeFoodWarehouseType = z.infer<typeof typeFoodWarehouse>;

export const returnItem = z.object({
  quantity: z.coerce.number().min(1, { message: "بڕی گەڕاندنەوە بنووسە" }),
});
export type returnItemType = z.infer<typeof returnItem>;

export const addExpense = z.object({
  transaction_type: z.string().optional().default("expense"),
  amount: z.coerce.number().optional(),
  subject: z.string().optional(),
  cash_id: z.string().optional(),
  custom_date: z.date().optional(),
  quantity: z.coerce.number().optional(),
  description: z.string().optional().default("note"),
});
export type addExpenseType = z.infer<typeof addExpense>;

export const addRole = z.object({
  name: z.string().min(1, { message: "ناو داخڵ بکە" }),
  description: z.string().min(1, { message: " تێبینی داخڵ بکە" }),

  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export type addRoleType = z.infer<typeof addRole>;

export const addUser = z.object({
  full_name: z.string().min(1, { message: "ناو داخڵ بکە" }),
  password: z.string().optional(),
  email: z.string().email().min(1, { message: "ئیمەیڵ داخڵ بکە" }),
  role_id: z.string().min(1, { message: "ڕۆڵ داخڵ بکە" }),
  image: z
    .instanceof(File) // Ensure the value is of type `File`
    .refine((file) => file.size < sizeImage, {
      message: "File size must be less than 1.5MB",
    })
    .nullable(),
});

export type addUserType = z.infer<typeof addUser>;

export const addExpenses = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  price: z.string().optional(),
  qunatity: z.string().optional(),
  date: z
    .date({
      required_error: "A date of birth is required.",
    })
    .optional(),
});

export type addExpensesType = z.infer<typeof addExpenses>;

// ----------------Type For Response----------------

export interface User {
  user_id: number;
  role_id: number;
  role_name: string;
  full_name: string;
  email: string;
  image: string;
  added_by: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  role_id: number;
  name: string;
  description: string;
  permissions: RolePermissions[];
}

export interface RolePermissions {
  category: string;
  permissions: Permission[];
}

export interface Permission {
  permission_id: number;
  name: string;
  have: boolean;
}

export interface Category {
  category_id: number;
  name_ku: string;
  name_ar: string;
  name_en: string;
  name_turkey: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderOptions {
  option_id: number;
  option_text: string;
}
export interface ItemAll {
  item_id: number;
  name: string;
}
export interface CategoryItem {
  active: boolean;
  created_at: string;
  item_category_id: number;
  name: string;
  updated_at: string;
}

export interface Options {
  option_id: number;
  option_text: string;
}
export interface Questions {
  question_id: number;
  question_text: string;
}

export interface Currency {
  business_id: number;
  dinar_price: number;
  dollar_price: number;
}
export interface TransactionSubject {
  transaction_subect_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface Cash {
  cash_id: number;
  cash_name: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
export interface Expenses {
  transaction_id: number;
  transaction_type: string;
  amount: number;
  subject: string;
  description: string;
  cash_id: number;
  added_by: number;
  transaction_subect_id: number;
  custom_date: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  transaction_id: number;
  transaction_type: "expense" | "profit" | "withdraw" | "deposit";
  amount: number;
  subject: string;
  description: string;
  cash_id: number;
  added_by: number;
  transaction_subect_id: number;
  custom_date: string;
  created_at: string;
  updated_at: string;
}
