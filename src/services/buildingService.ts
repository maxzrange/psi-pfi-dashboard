import { BuildingDTO } from "@interfaces/buildingInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildings = async (
  token: string
): Promise<ResType<PaginationType<BuildingDTO[]>>> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return successResponse<PaginationType<BuildingDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingDetail = async (
  id: number,
  token: string
): Promise<ResType<BuildingDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuilding}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<BuildingDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};
