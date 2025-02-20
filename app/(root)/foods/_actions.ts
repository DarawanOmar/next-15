"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";

export const changeStatusFoodAction = async (id: number) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.food.changeStatusFood(id),
  });
  return result;
};

export async function deleteFoodAction(id: string) {
  const result = await apiRequest({
    url: EndPoints.food.deleteFood(+id),
    method: "DELETE",
  });
  return result;
}

type dataQuestionSend = {
  food_id: number;
  question_id: number;
};
export const addQuestionToFood = async (data: dataQuestionSend) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.question.addFoodQuestion,
    data,
  });
  return result;
};
export const deleteQuestionToFood = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.question.deleteFoodQuestion(id),
  });
  return result;
};

type dataOptionsSend = {
  food_question_id: number;
  option_id: number;
};
export const addOptionsToFood = async (data: dataOptionsSend) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.options.addOptionQuestion,
    data,
  });
  return result;
};

export const deleteOptionsToFood = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.options.deleteOptionQuestion(id),
  });
  return result;
};
