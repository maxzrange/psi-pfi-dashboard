import { ResType } from "types/resType";
import {
  LoginDTO,
  LoginInput,
  LogoutDTO,
  RefreshDTO,
  RegisterDTO,
  RegisterInput,
} from "@interfaces/authInterface";
import { axiosInstance } from "@utils/configs/axios";
import { API_ENDPOINT } from "@utils/configs/api";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";

export const register = async (
  body: RegisterInput
): Promise<ResType<RegisterDTO>> => {
  try {
    const mapBody = {
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const response = await axiosInstance.post(API_ENDPOINT.register, mapBody);

    return successResponse<RegisterDTO>(response, "Registration success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const login = async (body: LoginInput): Promise<ResType<LoginDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.login, body, {
      withCredentials: true,
    });

    return successResponse<LoginDTO>(response, "Login success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const logout = async (token: string): Promise<ResType<LogoutDTO>> => {
  try {
    console.log(token);
    const response = await axiosInstance.post(
      API_ENDPOINT.logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return successResponse<LogoutDTO>(response, "Logout success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const refresh = async (): Promise<ResType<RefreshDTO>> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.refresh,
      {},
      {
        withCredentials: true,
      }
    );

    return successResponse<RefreshDTO>(response, "Login success!");
  } catch (error) {
    throw errorResponse(error);
  }
};
