import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import {
  Activity,
  Cash,
  Category,
  CategoryItem,
  Currency,
  Expenses,
  ItemAll,
  Options,
  OrderOptions,
  Questions,
  Role,
  RolePermissions,
  TransactionSubject,
  User,
} from "./_type";
import { InvoiceType } from "./[...slug]/page";
import { InvoiceType as typeofInvoice } from "../purchase/_type";

const endpoint = EndPoints.admin;
export const getAllRolesActive = async () => {
  const result = await apiRequest<Role[]>({
    method: "GET",
    url: endpoint.getAllRole,
  });

  return result;
};

export const getAllInvoice = async (
  type: InvoiceType,
  payment_type: string,
  time: string,
  date: string,
  page: number
) => {
  console.log(
    "URL => ",
    EndPoints.invoice.getAllInvoice(
      type,
      payment_type as "loan" | "cash" | "",
      time,
      date,
      "true",
      page
    )
  );
  const result = await apiRequest<typeofInvoice>({
    method: "GET",
    url: EndPoints.invoice.getAllInvoice(
      type,
      payment_type as "loan" | "cash" | "",
      time,
      date,
      "true",
      page
    ),
  });

  return result;
};

export const getAllPermission = async () => {
  const result = await apiRequest<RolePermissions[]>({
    method: "GET",
    url: endpoint.getAllPermission,
  });

  return result;
};

export const getOneRole = async (id: string) => {
  const result = await apiRequest<Role>({
    method: "GET",
    url: endpoint.getOneRoleID(id),
  });

  return result;
};

export const getAllUsers = async () => {
  const result = await apiRequest<User[]>({
    method: "GET",
    url: EndPoints.user.getAllUser,
  });
  return result;
};
export const getAllCategoryItem = async () => {
  const result = await apiRequest<CategoryItem[]>({
    method: "GET",
    url: EndPoints.category.getItemCategory,
  });
  return result;
};
export const getAllCategory = async () => {
  const result = await apiRequest<Category[]>({
    method: "GET",
    url: EndPoints.category.getAllCategory,
  });
  return result;
};
export const getAllOrderOptions = async () => {
  const result = await apiRequest<OrderOptions[]>({
    method: "GET",
    url: EndPoints.order.getOrderOptions,
  });
  return result;
};
export const getItemAll = async () => {
  const result = await apiRequest<ItemAll[]>({
    method: "GET",
    url: EndPoints.warehouse.item_all,
  });
  return result;
};
export const getAllOption = async () => {
  const result = await apiRequest<Options[]>({
    method: "GET",
    url: EndPoints.options.getAllOptions,
  });
  return result;
};
export const getAllQuestion = async () => {
  const result = await apiRequest<Questions[]>({
    method: "GET",
    url: EndPoints.question.getAllQuestion,
  });
  return result;
};

export const getCurrency = async () => {
  const result = await apiRequest<Currency>({
    method: "GET",
    url: EndPoints.currency.getCurrency,
  });
  return result;
};
export const getTransactionSubject = async () => {
  const result = await apiRequest<TransactionSubject[]>({
    method: "GET",
    url: EndPoints.transaction.getAllSubjectTransaction,
  });
  return result;
};
export const getAllCash = async () => {
  const result = await apiRequest<Cash[]>({
    method: "GET",
    url: EndPoints.transaction.getCashTransaction,
  });
  return result;
};
export const getAllExpenses = async (
  type: "expense" | "profit" | "withdraw" | "deposit",
  page: number,
  date: string
) => {
  const result = await apiRequest<Expenses[]>({
    method: "GET",
    url: EndPoints.transaction.getAllTransaction(type, page, date),
  });
  return result;
};

export const getAllActiviaty = async (page: number) => {
  const result = await apiRequest<Activity[]>({
    method: "GET",
    url: EndPoints.transaction.getAllTransaction("", page, ""),
  });
  return result;
};
