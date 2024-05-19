import axios from "axios";
import { User } from "../../interfaces/user.interface";
import { SERVER_URL } from "@constants";

export class UserService {
  static async updateUserPurchasedSets(id: number, value: number) {
    try {
      await axios.patch(`${SERVER_URL}/api/user?id=${id}&value=${value}`);
    } catch (err) {}
  }

  static async findAllUsers(): Promise<User[]> {
    try {
      return (
        await axios.get(`${SERVER_URL}/api/user/getAll`, {
          withCredentials: true,
        })
      ).data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async deleteUser(id: number): Promise<User[]> {
    return (
      await axios.delete(`${SERVER_URL}/api/user/${id}`, {
        withCredentials: true,
      })
    ).data;
  }

  static async blockUser(id: number): Promise<User[]> {
    return (
      await axios.patch(
        `${SERVER_URL}/api/user/block/${id}`,
        {},
        { withCredentials: true }
      )
    ).data;
  }

  static async getUser() {
    return await axios.get(`${SERVER_URL}/api/user/getUser`, {
      withCredentials: true,
    });
  }
}
