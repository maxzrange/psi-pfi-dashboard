import { UserProfileDTO } from "@interfaces/userInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { ResType } from "types/resType";

export const getUserProfile = async (
  username: string
): Promise<ResType<UserProfileDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.register}/${username}`
    );

    return successResponse(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};
