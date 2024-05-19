export interface User {
  id: number;
  purchasedSets: number;
  role: string;
  email: string;
  name: string;
  isBlocked: boolean;
  phoneNumber: string;
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}
