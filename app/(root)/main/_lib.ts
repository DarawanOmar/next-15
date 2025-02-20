import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";

export const getReport = async () => {
  const result = await apiRequest<Report>({
    method: "GET",
    url: EndPoints.report.getReport,
  });

  return result;
};

export interface Report {
  today_sale: number;
  compare_to_yestrday_sale: number;
  today_order: number;
  compare_to_yestrday_order: number;
  taken_table: number;
  available_table: number;
  food_sale: Array<{
    food_id: number;
    food_name: string;
    quantity: number;
    totalSale: number;
    image: string;
  }>;
}
