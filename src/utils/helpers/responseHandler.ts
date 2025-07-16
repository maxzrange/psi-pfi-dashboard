import { AxiosError } from "axios";
import { ErrResType } from "types/resType";

export const errorResponse = (error: any): ErrResType => {
  const axiosError = error as AxiosError;

  return {
    status: axiosError.response!.status,
    data: axiosError.response!.data,
  };
};
