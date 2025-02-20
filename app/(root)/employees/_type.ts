import { sizeImage } from "@/lib/globals";
import { z } from "zod";

export const addUser = z.object({
  name: z.string().min(1, { message: "ناو داخڵ بکە" }),
  email: z.string().email().min(1, { message: "ئیمەیڵ داخڵ بکە" }),
  role: z.string().min(1, { message: "ڕۆڵ داخڵ بکە" }),
  image: z
    .instanceof(File) // Ensure the value is of type `File`
    .refine((file) => file.size < sizeImage, {
      message: "File size must be less than 1.5MB",
    })
    .nullable(),
});

export type addUserType = z.infer<typeof addUser>;

export const addEmplooyes = z.object({
  name: z.string().min(1, { message: "ناو داخڵ بکە" }),
  job_title: z.string().min(1, { message: "پیشە داخڵ بکە" }),
  salary: z.string().min(1, { message: "مووچە داخڵ بکە" }),
  salary_payment: z.string().min(1, { message: "جۆری مووچە داخڵ بکە" }),
  hire_date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export type addEmplooyesType = z.infer<typeof addEmplooyes>;

export const payEmployees = z.object({
  cash_id: z.string().optional(),
  amount: z.coerce.number().optional(),
  end_date: z.date().optional(),
  start_date: z.date().optional(),
});

export type payEmployeesType = z.infer<typeof payEmployees>;

//----------------------------------Type ------------------------------------

export interface Employee {
  employee_id: number;
  name: string;
  job_title: string;
  salary: number;
  salary_payment: string;
  hire_date: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
