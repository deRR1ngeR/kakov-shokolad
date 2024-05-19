import { UserService } from "@services";

export const useSetUser = async () => {
  return await UserService.getUser().then((res) => {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  });
};
