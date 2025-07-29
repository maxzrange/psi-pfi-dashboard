import {
  BuildingTypeDTO,
  BuildingTypeInput,
} from "@interfaces/buildingTypeInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildingTypes = async (): Promise<
  ResType<PaginationType<BuildingTypeDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingTypes);

    return successResponse<PaginationType<BuildingTypeDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingTypeDetail = async (
  name: string
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`
    );

    return successResponse<BuildingTypeDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingType = async (
  body: BuildingTypeInput
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingType,
      body
    );

    return successResponse<BuildingTypeDTO>(response, "Building type added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuildingType = async (
  name: string,
  body: BuildingTypeInput
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`,
      body
    );

    return successResponse<{ message: string }>(
      response,
      "Building type updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteBuildingType = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(
      response,
      "Building type deleted!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
