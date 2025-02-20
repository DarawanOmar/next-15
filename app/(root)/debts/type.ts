import { z } from "zod";

export const payMoney = z.object({
  paid_amount: z.coerce.number().optional(),
  discount: z.coerce.number().optional(),
});

export type payMoneyType = z.infer<typeof payMoney>;

export interface LoansType {
  loans: Loan[];
  total_loan: number;
}

export interface Loan {
  partie_id: number;
  name: string;
  phone: string;
  partie_type: string;
  amount_we_owed_them: number;
  amount_owed_to_Us: number;
}
export interface OneLoan {
  name: string;
  payments: Array<{
    loan_payment_id: number;
    amount: number;
    type: string;
    partie_id: number;
    created_at: string;
    updated_at: string;
  }>;
}
