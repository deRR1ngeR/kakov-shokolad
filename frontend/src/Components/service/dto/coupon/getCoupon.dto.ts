export interface GetCouponDto {
  id: number;
  code: string;
  discountAmount: number;
  maxNumberOfActivations: number;
  numberOfActivations: number;
  isActive: boolean;
  expirationDate: string;
}
