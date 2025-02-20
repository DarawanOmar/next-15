import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: " fill out the Email field " }).email(),
  password: z.string().min(1, { message: "fill out the password filed" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
