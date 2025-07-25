import { ProjectDTO, ProjectInput } from "@interfaces/projectInterface";
import { API_ENDPOINT } from "@utils/configs/api";
import { axiosInstance } from "@utils/configs/axios";
import { errorResponse, successResponse } from "@utils/helpers/responseHandler";
import { PaginationType, ResType } from "types/resType";

export const getProjects = async (): Promise<
  ResType<PaginationType<ProjectDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getProjects);

    return successResponse<PaginationType<ProjectDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addProject = async (
  body: ProjectInput,
  userId: number | null,
  token: string
): Promise<ResType<ProjectDTO>> => {
  try {
    const mapBody = {
      ...body,
      status: Number(body.status),
      created_by: userId,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addProject,
      mapBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<ProjectDTO>(response, "Project added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteProject = async (
  name: string,
  token: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addProject}/${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return successResponse<{ message: string }>(response, "Project deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
