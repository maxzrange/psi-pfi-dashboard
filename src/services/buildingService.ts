import { BuildingDTO, BuildingInput } from "@interfaces/buildingInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";
import { addBuildingSide } from "./buildingSideService";

export const getBuildings = async (): Promise<
  ResType<PaginationType<BuildingDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildings);

    return successResponse<PaginationType<BuildingDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingDetail = async (
  id: number
): Promise<ResType<BuildingDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuilding}/${id}`
    );

    return successResponse<BuildingDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuilding = async (
  body: BuildingInput
): Promise<ResType<BuildingDTO>> => {
  try {
    const mapBody = {
      ...body,
      year_built: Number(body.year_built),
      building_type: body.building_type ? body.building_type.id : null,
      owner_id: 1,
      project_id: body.project_id ? body.project_id.id : null,
      latitude: body.location ? body.location.lat : null,
      longitude: body.location ? body.location.lng : null,
      buildingData: null,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuilding,
      mapBody
    );

    body.buildingData[0].forEach(async (val) => {
      await addBuildingSide({
        ...val,
        building_id: response.data.id,
      });
    });

    return successResponse<BuildingDTO>(response, "Building added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuilding = async (
  name: string,
  body: BuildingInput
): Promise<ResType<{ message: string }>> => {
  try {
    const mapBody = {
      ...body,
      year_built: Number(body.year_built),
      building_type: body.building_type ? body.building_type.id : null,
      project_id: body.project_id ? body.project_id.id : null,
      latitude: body.location ? body.location.lat : null,
      longitude: body.location ? body.location.lng : null,
    };

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuilding}/${encodeURIComponent(name)}`,
      mapBody
    );

    return successResponse<{ message: string }>(response, "Building updated!");
  } catch (error) {
    throw errorResponse(error);
  }
};
