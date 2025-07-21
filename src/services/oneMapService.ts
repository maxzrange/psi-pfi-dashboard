import {
  LoginOneMapDTO,
  SearchAddressDTO,
  SecondThemeDTO,
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
  params: string[]
): Promise<SecondThemeDTO[][]> => {
  try {
    const resLogin = await loginOneMap();

    const resultData: SecondThemeDTO[][] = [];

    for (const param of params) {
      const response = await axiosOneInstance.get(
        `${ONE_API_ENDPOINT.theme}?queryName=${param}`,
        {
          headers: {
            Authorization: `Bearer ${resLogin.access_token}`,
          },
        }
      );

      const newData = response.data.SrchResults.slice(1) as SecondThemeDTO[];

      resultData.push(newData);
    }

    return resultData;
  } catch (error) {
    throw errorResponse(error);
  }
};
