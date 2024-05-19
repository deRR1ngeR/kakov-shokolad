import axios from "axios";
import { CreateUserDto } from "./dto/user/create-user.dto";
import { UserLoginDto } from "./dto/user/user-login.dto";
import { SERVER_URL } from "@constants";

export class AuthService {
  static async FetchRegistration(dto: CreateUserDto): Promise<any> {
    return await axios(`${SERVER_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: dto.name,
        email: dto.email,
        password: dto.password,
        phoneNumber: dto.phoneNumber,
      }),
      withCredentials: true,
    });
  }

  static async FetchLogin(dto: UserLoginDto): Promise<any> {
    return await axios(`${SERVER_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: dto.email,
        password: dto.password,
      }),
      withCredentials: true,
    });
  }

  static async FetchLogout(): Promise<void> {
    return await axios(`${SERVER_URL}/api/auth/logout`, {
      method: "GET",
      withCredentials: true,
    });
  }
}
