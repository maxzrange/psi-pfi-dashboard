import { AxiosError, AxiosResponse } from "axios";
import { ResType } from "types/resType";

export const successResponse = <T>(
  res: AxiosResponse<T, any>,
  message: string
): ResType<T> => ({
  status: res.status,
  message,
  data: res.data,
});

export const errorResponse = (error: any): ResType => {
  const axiosError = error as AxiosError<any, any>;

  return {
    status: axiosError.response?.status ?? 999,
    message:
      axiosError.response && axiosError.response.data
        ? axiosError.status === 422 &&
          Array.isArray(axiosError.response.data.detail)
          ? "Validation Error"
          : axiosError.response.data.detail
        : "Internal Server Error",
    data: axiosError.response?.data,
  };
};
