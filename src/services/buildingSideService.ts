import {
  BuildingSideDTO,
  BuildingSideInput,
} from "@interfaces/buildingSideInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getBuildingSides = async (
  token: string
): Promise<ResType<PaginationType<BuildingSideDTO[]>>> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingSides, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return successResponse<PaginationType<BuildingSideDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingSide = async (
  body: BuildingSideInput,
  token: string
): Promise<ResType<BuildingSideInput>> => {
  try {
    const mapBody = {
      ...body,
      building_id: body.building_id ? body.building_id.id : null,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingSide,
      mapBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<BuildingSideInput>(response, "Building side added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuildingSide = async (
  name: string,
  body: BuildingSideInput,
  token: string
): Promise<ResType<{ message: string }>> => {
  try {
    const mapBody = {
      ...body,
      building_id: body.building_id ? body.building_id.id : null,
    };

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuildingSide}/${encodeURIComponent(name)}`,
      mapBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<{ message: string }>(
      response,
      "Building side updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
