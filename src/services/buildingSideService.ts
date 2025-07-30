import {
  BuildingSideDTO,
  BuildingSideInput,
} from "@interfaces/buildingSideInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildingSides = async (): Promise<
  ResType<PaginationType<BuildingSideDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingSides);

    return successResponse<PaginationType<BuildingSideDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingSideDetail = async (
  name: string
): Promise<ResType<BuildingSideDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuildingSide}/${encodeURIComponent(name)}`
    );

    return successResponse<BuildingSideDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingSide = async (
  body: BuildingSideInput
): Promise<ResType<BuildingSideInput>> => {
  try {
    const mapBody = {
      ...body,
      building_id: body.building_id ? body.building_id.id : null,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingSide,
      mapBody
    );

    return successResponse<BuildingSideInput>(response, "Building side added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuildingSide = async (
  name: string,
  body: BuildingSideInput
): Promise<ResType<{ message: string }>> => {
  try {
    const mapBody = {
      ...body,
      building_id: body.building_id ? body.building_id.id : null,
    };

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuildingSide}/${encodeURIComponent(name)}`,
      mapBody
    );

    return successResponse<{ message: string }>(
      response,
      "Building side updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteBuildingSide = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addBuildingSide}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(
      response,
      "Building side deleted!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
