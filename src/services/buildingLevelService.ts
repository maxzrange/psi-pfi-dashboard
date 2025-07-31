import { BuildingLevelInput } from "@interfaces/buildingLevelInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { ResType } from "types/resType";

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
