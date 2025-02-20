import { EndPoints } from "@/lib/routes/EndPoints";
import { createInvoiceType } from "./_type";
import { instance } from "@/lib/utils/requestHandler";

export const addInvoiceAction = async (data: createInvoiceType) => {
  console.log("Formatted => ", data);
  try {
    const res = await instance.post(EndPoints.invoice.addInvoice, {
      type: "buy",
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
