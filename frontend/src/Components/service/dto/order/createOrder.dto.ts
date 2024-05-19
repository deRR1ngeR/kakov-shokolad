export interface CreateOrderDto {
  userId: number;

  dateOfOrder: Date;

  deliveryMethod: "PICKUP" | "DELIVERY";

  adress?: string;

  totalAmount: number;

  comment?: string;

  products: any[];
}
