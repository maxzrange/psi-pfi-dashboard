import useOneMapModel from "@models/oneMapModel";
import { MapType } from "types/formType";

const useOneMapController = () => {
  const { useLoginOneMap, useGetDroneQuery } = useOneMapModel();

  const loginOneMapMutation = useLoginOneMap();

  const getDroneQueryMutation = useGetDroneQuery();

  return {
    loginOneMapService: () => loginOneMapMutation.mutate(),
    getDroneQueryService: (body: MapType) => getDroneQueryMutation.mutate(body),
  };
};

export default useOneMapController;
