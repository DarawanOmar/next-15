import { EndPoints } from "@/lib/routes/EndPoints";
import { apiRequest } from "@/lib/utils/axiosHandler";
import { Employee } from "./_type";

export const getAllEmployee = async (name: string, page: number) => {
  const result = await apiRequest<Employee[]>({
    method: "GET",
    url: EndPoints.employees.getAllEmployee(name, page),
  });

  return result;
};
export const getEmployees = async () => {
  const result = await apiRequest<Employee[]>({
    method: "GET",
    url: EndPoints.employees.getEmployees,
  });

  return result;
};
