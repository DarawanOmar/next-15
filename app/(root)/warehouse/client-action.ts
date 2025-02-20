import { EndPoints } from "@/lib/routes/EndPoints";
import { addProductType } from "./_type";
import { instance } from "@/lib/utils/requestHandler";

export const addProductAction = async (data: addProductType) => {
  console.log("Data Action", data);
  const res = await instance.post(EndPoints.warehouse.addItem, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status === 200) {
    return {
      success: true,
      message: res.data.message,
    };
  }
  return {
    success: false,
    message: "error in add Item",
  };
};
export const updateProductAction = async (id: number, data: addProductType) => {
  const { expiration_date, fare_price_per_item, quantity, ...rest } = data;
  const res = await instance.put(EndPoints.warehouse.updateItem(id), rest, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status === 200) {
    return {
      success: true,
      message: res.data.message,
    };
  }
  return {
    success: false,
    message: "error in Update Item",
  };
};
