import { User } from "@/interfaces/user.interface";
import { UserProductsDto } from "../product/userProducts.dto";

export interface GetOrderDto {
  id: number;
  user: User;
  creationDate?: string;
  dateOfOrder: string;
  deliveryMethod: "PICKUP" | "DELIVERY";
  orderStatus: boolean;
  adress: string;
  totalAmount: number;
  comment: string;
  product: UserProductsDto[];
}
