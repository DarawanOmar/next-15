"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { addTableType, orderFoodType } from "./_type";
import { SelectedFood } from "./order-food-store";

export const addTableAction = async (data: addTableType) => {
  const { status, ...rest } = data;
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.table.addTable,
    data: rest,
  });
  return result;
};
export const updateTableAction = async (id: number, data: addTableType) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.table.updateTable(id),
    data,
  });
  return result;
};

export const deleteTableAction = async (id: string) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.table.deleteTable(+id),
  });
  return result;
};
export const reserveTableAction = async (id: string) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.table.reserveTable(+id),
  });
  return result;
};

export const orderTableFood = async (
  table_id: number,
  data: orderFoodType,
  foods: SelectedFood[]
) => {
  const {
    discount_dinar,
    discount_percentage,
    table_number,
    options,
    order_type,
    note,
    ...rest
  } = data;

  const formattedData = foods.map((food) => {
    return {
      food_id: food.food_id,
      quantity: food.addQuantity,
      properties: food.properties,
    };
  });
  // Other options it will be have it
  const otherOptions: Record<string, any> = {};
  Object.entries(rest).forEach(([key, value]) => {
    if (value) {
      otherOptions[key] = value;
    }
  });
  const dataSendFinal = {
    table_id: table_id,
    order_type: data.order_type,
    options: data.options,
    note: data.note,
    foods: formattedData,
    ...otherOptions,
  };
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.order.orderFood,
    data: dataSendFinal,
  });
  return result;
};
// This is for when add the food to the order and add another food to the same order
export const orderAddForSecondTime = async (
  order_id: number,
  data: {
    note: string;
    options: string[];
  },
  foods: SelectedFood[]
) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.order.oneOrderFood(order_id),
    data: {
      note: data.note,
      options: data.options,
      foods: foods.map((food) => {
        return {
          food_id: food.food_id,
          quantity: food.addQuantity,
          properties: food.properties,
        };
      }),
    },
  });
  return result;
};
// this is for increase or decrease  the quantity of the food in the order
export const orderAdd = async (
  order_id: string,
  data: {
    note: string;
    options: [];
  },
  foods: SelectedFood[]
) => {
  const formattedData = foods.map((food) => {
    return {
      food_id: food.food_id,
      quantity: food.addQuantity - food.qunaity!,
      properties: food.properties,
    };
  });
  const dataSend = {
    ...data,
    foods: formattedData,
  };

  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.order.oneOrderFood(+order_id),
    data: dataSend,
  });
  return result;
};

export const cancleOrder = async (id: string) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.order.orderCancle(+id),
  });
  return result;
};
export const payOrder = async (
  order_id: string,
  order_item_id: number,
  quantity: number
) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.order.orderPay(+order_id),
    data: [
      {
        order_item_id,
        quantity,
      },
    ],
  });
  return result;
};
export const finishOrderAction = async (
  order_id: string,
  data: {
    note: string;
    discount_type: string;
    total_discount_amount: number;
  }
) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.order.orderFinish(+order_id),
    data,
  });
  return result;
};
