import { ResType } from "types/resType";

import { axiosInstance } from "@utils/configs/axios";
import { API_PROJECT } from "@utils/configs/api";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { ProjectDTO, ProjectInput } from "@interfaces/projectInterface";

export const projectAdd = async (
  body: ProjectInput
): Promise<ResType<ProjectDTO>> => {
  try {
    const mapBody = {
      name: body.name,
      description: body.description,
      address: body.address_detail,
      status: body.status,
    };

    const response = await axiosInstance.post(API_PROJECT.project, mapBody);

    return successResponse<ProjectDTO>(response, "Project success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const projectList = async (): Promise<ResType<ProjectDTO>> => {
  try {
    const response = await axiosInstance.get(API_PROJECT.project_list);

    return successResponse<ProjectDTO>(response, "Login success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getAllProjects = async (): Promise<ResType<ProjectDTO[]>> => {
  try {
    const res = await axiosInstance.get(API_PROJECT.project_list); 
    return successResponse<ProjectDTO[]>(res, "Projects fetched");
  } catch (err) {
    throw errorResponse(err);
  }
};