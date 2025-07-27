import { ResType } from "types/resType";

import { axiosInstance } from "@utils/configs/axios";
import { API_BUILDING } from "@utils/configs/api";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { BuildingTypeDTO, BuildingTypeInput } from "@interfaces/buildingInterface";

export const buildingTypeAdd = async (
  body: BuildingTypeInput
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const mapBody = {
      name: body.name,
      desciption: body.description,
      
    };

    const response = await axiosInstance.post(API_BUILDING.building_type, mapBody);

    return successResponse<BuildingTypeDTO>(response, "Building Type success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

