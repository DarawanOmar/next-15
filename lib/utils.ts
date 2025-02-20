import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiRequest } from "./utils/axiosHandler";
import { EndPoints } from "./routes/EndPoints";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProducts = async () => {
  const result = await apiRequest<any[]>({
    method: "GET",
    url: EndPoints.category.getAllCategory,
  });

  return result;
};
export const getProducts2 = async () => {
  const result = await apiRequest<any[]>({
    method: "GET",
    url: EndPoints.category.getAllCategory,
  });

  return result;
};
export const getCategoryProducts = async () => {
  const result = await apiRequest<any[]>({
    method: "GET",
    url: EndPoints.admin.getAllRole,
  });

  return result;
};

export const calculateDiscountedPrice = (
  totalPrice: number,
  discountType: "percentage" | "amount",
  discountValue: number
): number => {
  console.log(
    "Calculating discounted price...",
    totalPrice,
    discountType,
    discountValue
  );
  if (!discountValue || discountValue <= 0) return totalPrice;

  if (discountType === "percentage") {
    const discountAmount = (totalPrice * discountValue) / 100;
    return totalPrice - discountAmount;
  } else if (discountType === "amount") {
    return totalPrice - discountValue;
  }

  return totalPrice; // Fallback in case of incorrect discount type
};
