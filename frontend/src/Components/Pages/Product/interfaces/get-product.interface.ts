import { ProductImagesInterface } from "./product.images.interface";

export interface GetProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  isActivated: boolean;
  main_image: string;
  ProductImages: ProductImagesInterface[];
  isChecked?: boolean;
}
