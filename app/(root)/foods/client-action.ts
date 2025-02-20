import { EndPoints } from "@/lib/routes/EndPoints";
import { addFoodType } from "./_type";
import { instance } from "@/lib/utils/requestHandler";

export const addFoodAction = async (data: addFoodType) => {
  const { propertys, ...rest } = data;
  const formattedPropertys = propertys?.map((item) => {
    return {
      question_id: Number(item.question_id),
      options: item.options.map((option) => Number(option)),
    };
  });
  console.log("Formatted => ", formattedPropertys);
  try {
    const res = await instance.post(EndPoints.food.addFood, {
      ...rest,
      propertys: formattedPropertys,
    });
    if (res.status === 200) {
      return {
        success: true,
        message: res.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "کێشەیەک لە سێرڤەرەوە دێتەوە",
    };
  }
};
export const updateFoodAction = async (id: number, values: addFoodType) => {
  try {
    const { propertys, ...data } = values;
    const res = await instance.put(EndPoints.food.updateFood(id), {
      ...data,
    });
    if (res.status === 200) {
      return {
        success: true,
        message: res.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "کێشەیەک لە سێرڤەرەوە دێتەوە",
    };
  }
};
