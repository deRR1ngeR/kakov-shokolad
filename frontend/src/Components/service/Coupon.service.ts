import { SERVER_URL } from "@/constants";
import { GetCouponDto } from "./dto/coupon/getCoupon.dto";
import { CreateCouponDto } from "./dto/coupon/createCouponDto";
import axios from "axios";

export class CouponService {
  static async createCoupon(data: CreateCouponDto) {
    const response = await axios.post(
      `${SERVER_URL}/api/coupon`,
      {
        ...data,
      },
      { withCredentials: true }
    );
    return response.data;
  }

  static async deleteCoupon(id: number) {
    const response = await axios.delete(`${SERVER_URL}/api/coupon/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async getAllCoupons(): Promise<GetCouponDto[]> {
    const response = await axios.get(`${SERVER_URL}/api/coupon/all`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async changeCouponStatus(id: number) {
    const response = await axios.patch(
      `${SERVER_URL}/api/coupon/${id}`,
      { data: null },
      { withCredentials: true }
    );
    return response.data;
  }

  static async getCouponByCode(code: string) {
    const response = await axios.get(`${SERVER_URL}/api/coupon/${code}`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async activateCoupon(code: string) {
    const response = await axios.patch(
      `${SERVER_URL}/api/coupon/activate/${code}`,
      {
        data: null,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
}
