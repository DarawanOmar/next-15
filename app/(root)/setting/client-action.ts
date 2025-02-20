import { apiRequest } from "@/lib/utils/axiosHandler";
import { addUserType } from "./_type";
import { EndPoints } from "@/lib/routes/EndPoints";

export async function addUserAction(data: addUserType) {
  const { image, ...rest } = data;
  const result = await apiRequest({
    method: "POST",
    url: EndPoints.user.addUser,
    data: rest,
  });
  return result;
}
export async function updateUserAction(id: number, data: addUserType) {
  const { image, ...rest } = data;

  const result = await apiRequest({
    method: "PUT",
    url: EndPoints.user.updateUser(id),
    data: rest,
  });
  return result;
}
