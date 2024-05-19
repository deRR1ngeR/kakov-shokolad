export interface CreateProductDto {
  name: string | undefined;
  price: string | undefined;
  ProductImages: Express.Multer.File[] | undefined;
  description: string | undefined;
}
