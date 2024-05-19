import { GetProductInterface } from "@/Components/Pages/Product/interfaces/get-product.interface";

export interface UserProductsDto {
  product: GetProductInterface;
  description?: string;
  count: number;
  isChecked?: boolean;
}
