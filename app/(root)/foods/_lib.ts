import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { Food } from "./_type";

export const getAllFood = async (category_id: number, page: number) => {
  const result = await apiRequest<Food[]>({
    method: "GET",
    url: EndPoints.food.getAllFood(category_id, page),
  });

  return result;
};
