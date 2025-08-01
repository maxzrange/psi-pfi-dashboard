import {
  BuildingLevelDTO,
  BuildingLevelInput,
} from "@interfaces/buildingLevelInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildingLevels = async (): Promise<
  ResType<PaginationType<BuildingLevelDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingLevels);

    return successResponse<PaginationType<BuildingLevelDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingLevel = async (
  body: BuildingLevelInput
): Promise<ResType<BuildingLevelInput>> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingLevel,
      body
    );

    return successResponse<BuildingLevelInput>(
      response,
      "Building level added!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
