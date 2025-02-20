import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";

export const getAllReport = async (time: string, date: string) => {
  console.log("URL => ", EndPoints.report.getAllReport(time, date));
  const result = await apiRequest<Report>({
    method: "GET",
    url: EndPoints.report.getAllReport(time, date),
  });

  return result;
};

export interface Report {
  buy_report: {
    total_buy: number;
    loan_buy: number;
    cash_buy: number;
  };
  sale_report: {
    loan_sale: number;
    cash_sale_sale: number;
    total_sale: number;
  };
  total_profit: number;
  most_order: [
    {
      food_id: number;
      food_name: string;
      quantity: number;
      totalSale: number;
      image: string;
    }
  ];
  user_sale: Array<{
    user_id: number;
    user_name: string;
    total_sale: number;
  }>;
}
