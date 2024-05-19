export interface AddProductToCart {
    userId: number;
    productId: number;
    count: number;
    description?: string;
}