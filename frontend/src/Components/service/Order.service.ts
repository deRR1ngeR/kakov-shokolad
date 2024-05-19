import axios from "axios";
import { CreateOrderDto } from "./dto/order/createOrder.dto";
import { GetOrderDto } from "./dto/order/getOrder.dto";
import { SERVER_URL } from "@constants";

export class OrderService {
  static async createOrder(data: CreateOrderDto) {
    return await axios("http://localhost:3000/api/order", {
      method: "POST",
      data: {
        ...data,
      },
      withCredentials: true,
    });
  }

  static async getUserOrders(): Promise<GetOrderDto[]> {
    return (
      await axios.get(`${SERVER_URL}/api/order`, {
        withCredentials: true,
      })
    ).data;
  }

  static async getAllOrders(): Promise<GetOrderDto[]> {
    return (
      await axios.get(`${SERVER_URL}/api/order/all`, {
        withCredentials: true,
      })
    ).data;
  }

  static async changeStatusOrder(id: number) {
    return (
      await axios.patch(
        `${SERVER_URL}/api/order/${id}`,
        { data: null },
        {
          withCredentials: true,
        }
      )
    ).data;
  }

  static async deleteOrder(id: number) {
    return (
      await axios.delete(`${SERVER_URL}/api/order/` + id, {
        withCredentials: true,
      })
    ).data;
  }
}
