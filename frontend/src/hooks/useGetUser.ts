import { User } from "src/interfaces/user.interface";

export const useGetUser = (): User => {
  return JSON.parse(localStorage.getItem("user") || "{}") as User;
};
