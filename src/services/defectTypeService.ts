import {
  DefectTypeDTO,
  DefectTypeInput,
} from "@interfaces/defectTypeInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getDefectTypes = async (): Promise<
  ResType<PaginationType<DefectTypeDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getDefectTypes, {
      skipAuth: true,
    });

    return successResponse<PaginationType<DefectTypeDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getDefectTypeDetail = async (
  name: string
): Promise<ResType<DefectTypeDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addDefectType}/${encodeURIComponent(name)}`,
      { skipAuth: true }
    );

    return successResponse<DefectTypeDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addDefectType = async (
  body: DefectTypeInput
): Promise<ResType<DefectTypeDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.addDefectType, body);

    return successResponse<DefectTypeDTO>(response, "Defect type added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateDefectType = async (
  name: string,
  body: DefectTypeInput
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addDefectType}/${encodeURIComponent(name)}`,
      body
    );

    return successResponse<{ message: string }>(
      response,
      "Defect type updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteDefectType = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addDefectType}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(
      response,
      "Defect type deleted!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
