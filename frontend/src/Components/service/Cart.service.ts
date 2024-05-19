import axios from "axios";
import { AddProductToCart } from "./dto/cart/addProductToCart.dto";
import { deleteProductFromCartDto } from "./dto/product/deleteProductFromCart.dto";
import { SERVER_URL } from "@constants";

export class CartService {
  static async addOrUpdateProductToCart({
    userId,
    productId,
    count,
    description,
  }: AddProductToCart) {
    return await axios(`${SERVER_URL}/api/cart?id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        productId,
        count,
        description,
      }),
      withCredentials: true,
    });
  }

  static async getCart(userId: number) {
    return (
      await axios.get(`${SERVER_URL}/api/cart/${userId}`, {
        withCredentials: true,
      })
    ).data;
  }

  static async deleteProductFromCart({
    userId,
    productId,
  }: deleteProductFromCartDto) {
    return (
      await axios(
        `${SERVER_URL}/api/cart?userId=${userId}&productId=${productId}`,
        {
          method: "DELETE",
          withCredentials: true,
        }
      )
    ).data;
  }
}
