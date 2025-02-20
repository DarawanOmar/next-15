"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { revalidateTag } from "next/cache";
import {
  addExpensesType,
  addExpenseType,
  addOptionsType,
  addQuestionType,
  addRoleType,
  introduseExpensesType,
  specailProfitFormType,
  typeFoodWarehouse,
  typeFoodWarehouseType,
} from "./_type";
import { dollarChangeType } from "@/components/reusable/dollar-update";

// ------------------------------  Role ------------------------------
export const addRoleAction = async (values: addRoleType) => {
  const formattedPermissions = values.items.reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const data = {
    name: values.name,
    description: values.description,
    permissions: formattedPermissions,
  };
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.admin.addRole,
    data,
  });

  revalidateTag("role");

  return result;
};
export const updateRoleAction = async (id: string, values: addRoleType) => {
  const formattedPermissions = values.items.reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const data = {
    name: values.name,
    description: values.description,
    permissions: formattedPermissions,
  };
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.admin.updateRole(id),
    data,
  });
  revalidateTag("role");
  return result;
};
export const deleteRole = async (id: string) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.admin.deleteRole(id),
  });
  revalidateTag("role");
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.user.deleteUser(id),
  });
  revalidateTag("user");
  return result;
};
// ------------------------------  Category ------------------------------
export const addCategoryAction = async (data: typeFoodWarehouseType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.category.addCategory,
    data: {
      name_ku: data.name,
      name_en: data.name,
      name_ar: data.name,
      name_turkey: data.name,
    },
  });
  return result;
};
export const deleteCategoryItem = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.category.deleteCategoryItem(id),
  });
  return result;
};

// ------------------------------  Options --------------------------------
export const addOptionsAction = async (data: addOptionsType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.options.addOptions,
    data,
  });
  return result;
};

export const deleteOptionsAction = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.options.deleteOptions(id),
  });
  return result;
};

export const addOrderOptionAction = async (data: typeFoodWarehouseType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.order.addOrderOptions,
    data: {
      option_text: data.name,
    },
  });
  return result;
};
export const deleteOrderOptionsItem = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.order.deleteOrderOptions(id),
  });
  return result;
};

// ------------------------------ Questions --------------------------------

export const addQuestionAction = async (data: addQuestionType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.question.addQuestion,
    data,
  });
  return result;
};

export const deleteQuestionItem = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.question.deleteQuestion(id),
  });
  return result;
};

// ------------------------------  Expenses ------------------------------

export const addExpnesesAction = async (data: addExpensesType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.admin.addRole,
    data,
  });

  return result;
};
export const updateExpnesesAction = async (
  id: number,
  data: addExpensesType
) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.expenses.updateDeleteExpenses(id),
    data,
  });

  return result;
};
export const deleteExpnesesAction = async (id: number) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.expenses.updateDeleteExpenses(id),
  });

  return result;
};
export const retrunItemAction = async (id: number, data: any) => {
  const result = await apiRequest({
    method: "DELETE",
    url: EndPoints.invoice.itemReturn(id),
    data,
  });

  return result;
};

// ------------------------------  Currency ------------------------------

export const updateCurrencyAction = async (data: dollarChangeType) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.currency.updateCurrency,
    data: {
      dinar_price: data.IQDInput,
      dollar_price: data.USDrate,
    },
  });

  return result;
};

// ------------------------------  Currency ------------------------------

export const addExpenseAction = async (data: addExpenseType) => {
  console.log("Data => ", data);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.transaction.addTrasaction,
    data,
  });

  return result;
};
export const updateExpenseAction = async (id: number, data: addExpenseType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.transaction.addTrasaction,
    data,
  });

  return result;
};

// ------------------------------  Transaction ------------------------------

export const addTransactionSubjectAction = async (
  data: introduseExpensesType
) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.transaction.addSubjectTransaction,
    data,
  });

  return result;
};

type addTransactionType = {
  transaction_type: string;
  amount: number;
  description: string;
  cash_id: number;
};
export const addTransactionAction = async (data: addTransactionType) => {
  const dataSend = {
    ...data,
    subject: data.transaction_type,
  };
  console.log("Data Action Add Transaction => ", dataSend);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.transaction.addTrasaction,
    data: dataSend,
  });

  return result;
};

type Transferdata = {
  source: number;
  destination: number;
  amount: number;
  note: string;
};

export const transferTransactionAction = async (data: Transferdata) => {
  console.log("Data Action Transfer Transaction => ", data);
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.transaction.transferTransaction,
    data,
  });

  return result;
};

type addSpecailTransaction = {
  transaction_type: "profit";
  amount: number;
  description: string;
  custom_date: Date;
};
export const addSpecailTransactionAction = async (
  data: addSpecailTransaction
) => {
  const dataSend = {
    ...data,
    subject: data.transaction_type,
  };
  console.log("Data Action Add Transaction => ", dataSend);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.transaction.addTrasaction,
    data: dataSend,
  });

  return result;
};
