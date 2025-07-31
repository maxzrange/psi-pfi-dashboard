import { DefectDTO, DefectInput } from "@interfaces/defectInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getDefects = async (): Promise<
  ResType<PaginationType<DefectDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getDefects, {
      skipAuth: true,
    });

    return successResponse<PaginationType<DefectDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getDefectDetail = async (
  name: string
): Promise<ResType<DefectDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.getDefects}/${encodeURIComponent(name)}`,
      { skipAuth: true }
    );

    return successResponse<DefectDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addDefect = async (
  body: DefectInput
): Promise<ResType<DefectDTO>> => {
  try {
    const mapBody = {
      ...body,
      defect_type_id: body.defect_type_id ? body.defect_type_id.id : null,
    };

    const response = await axiosInstance.post(API_ENDPOINT.getDefects, mapBody);

    return successResponse<DefectDTO>(response, "Defect added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateDefect = async (
  name: string,
  body: DefectInput
): Promise<ResType<{ message: string }>> => {
  try {
    const mapBody = {
      ...body,
      defect_type_id: body.defect_type_id ? body.defect_type_id.id : null,
    };

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.getDefects}/${encodeURIComponent(name)}`,
      mapBody
    );

    return successResponse<{ message: string }>(response, "Defect updated!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteDefect = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.getDefects}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(response, "Defect deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
