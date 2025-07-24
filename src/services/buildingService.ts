import {
  BuildingTypeDTO,
  BuildingTypeInput,
} from "@interfaces/buildingInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildingTypes = async (
  token: string
): Promise<ResType<PaginationType<BuildingTypeDTO[]>>> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingTypes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return successResponse<PaginationType<BuildingTypeDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingTypeDetail = async (
  name: string,
  token: string
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<BuildingTypeDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingType = async (
  body: BuildingTypeInput,
  token: string
): Promise<ResType<Omit<BuildingTypeDTO, "description">>> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingType,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<Omit<BuildingTypeDTO, "description">>(
      response,
      "Building type added!"
    );
  } catch (error) {
    return errorResponse(error);
  }
};
