import {
  LoginOneMapDTO,
  RetrieveThemeDTO,
  SearchAddressDTO,
} from "@interfaces/oneMapInterface";
import { ONE_API_ENDPOINT } from "@utils/configs/api";
import { axiosOneInstance } from "@utils/configs/axios";
import { errorResponse } from "@utils/helpers/responseHandler";

export const loginOneMap = async (): Promise<LoginOneMapDTO> => {
  try {
    const response = await axiosOneInstance.post(ONE_API_ENDPOINT.login, {
      email: process.env.REACT_APP_ONE_MAP_EMAIL,
      password: process.env.REACT_APP_ONE_MAP_PASS,
    });

    return response.data as LoginOneMapDTO;
  } catch (error) {
    throw errorResponse(error);
  }
};

export const searchAddress = async (
  search: string
): Promise<SearchAddressDTO> => {
  try {
    const response = await axiosOneInstance.get(
      `${ONE_API_ENDPOINT.search}?searchVal=${search}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );

    return response.data as SearchAddressDTO;
  } catch (error) {
    throw errorResponse(error);
  }
};

export const retrieveTheme = async (
  param: string,
  token: string
): Promise<RetrieveThemeDTO> => {
  try {
    const response = await axiosOneInstance.get(
      `${ONE_API_ENDPOINT.theme}?queryName=${param}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as RetrieveThemeDTO;
  } catch (error) {
    throw errorResponse(error);
  }
};
