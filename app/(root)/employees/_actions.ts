"use server";

import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { addEmplooyesType, payEmployeesType } from "./_type";

export async function deleteUser(id: string) {
  const result = await apiRequest({
    url: EndPoints.employees.deleteEmployee(+id),
    method: "DELETE",
  });
  return result;
}

export const addEmplooyeAction = async (data: addEmplooyesType) => {
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.employees.addEmployee,
    data,
  });
  return result;
};
export const updateEmplooyeAction = async (
  id: number,
  data: addEmplooyesType
) => {
  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.employees.updateEmployee(id),
    data,
  });
  return result;
};

export async function deleteEmployee(id: string) {
  const result = await apiRequest({
    url: EndPoints.employees.deleteEmployee(+id),
    method: "DELETE",
  });
  return result;
}

export const payEmplooyeAction = async (id: number, data: payEmployeesType) => {
  console.log("Data", data);
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.employees.payEmployee,
    data: {
      employee_id: id,
      ...data,
    },
  });
  return result;
};
