import { sizeImage } from "@/lib/globals";
import { z } from "zod";

export const addFood = z.object({
  name_ku: z.string().optional(),
  name_ar: z.string().optional(),
  name_turkey: z.string().optional(),
  name_en: z.string().optional(),
  price: z.coerce.number().optional(),
  category_id: z.coerce.string().optional(),
  item_id: z.coerce.string().optional(),
  calories: z.coerce.number().optional(),
  description: z.string().optional(),
  propertys: z
    .array(
      z.object({
        question_id: z.coerce.number(),
        options: z.array(z.coerce.number()),
      })
    )
    .optional(),
  image: z
    .instanceof(File) // Ensure the value is of type `File`
    .refine((file) => file.size < sizeImage, {
      message: "File size must be less than 1.5MB",
    })
    .nullable(),
});

export type addFoodType = z.infer<typeof addFood>;

// ----------------------------------Type ------------------------------------

export interface Food {
  food_id: number;
  category_id: number;
  added_by: number;
  name_ku: string;
  name_en: string;
  name_ar: string;
  name_turkey: string;
  image: string;
  price: number;
  item_id: number;
  order_num: number;
  sold_out: boolean;
  description: string;
  calories: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  food_question: FoodQuestion[];
}

export interface FoodQuestion {
  food_question_id: number;
  question: {
    question_text: string;
  };
  food_option: FoodOption[];
}

export interface FoodOption {
  food_option_id: number;
  option_id: number;
  option: {
    option_text: string;
  };
}
