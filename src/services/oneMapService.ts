import { errorResponse } from "@helpers/responseHandler";
import { LoginOneMapDTO } from "@interfaces/oneMapInterface";
import axios from "axios";
import { MapType } from "types/formType";

export const loginOneMap = async (): Promise<LoginOneMapDTO> => {
  try {
    const response = await axios.post(
      "https://www.onemap.gov.sg/api/auth/post/getToken",
      {
        email: process.env.REACT_APP_ONE_MAP_EMAIL,
        password: process.env.REACT_APP_ONE_MAP_PASS,
      }
    );

    return response.data as LoginOneMapDTO;
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getDroneQuery = async (body: MapType, token: string) => {
  try {
    const response = await axios.get(
      `https://www.onemap.gov.sg/api/public/revamp/commonsvc/DroneQuery?latitude=${body.lat}&longitude=${body.lng}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw errorResponse(error);
  }
};
