export interface CouponDto {
  code: string;
  discountAmount: number;
  maxNumberOfActivations: number;
  numberOfActivations: number;
  isActive: boolean;
  expirationDate: Date;
}
