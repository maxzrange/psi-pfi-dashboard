import { getBuildingLevels } from "@services/buildingLevelService";
import { useQuery } from "@tanstack/react-query";

const useBuildingLevelModel = () => {
  const useGetBuildingLevelDropdown = () =>
    useQuery({
      queryKey: ["getBuildingLevelDropdown"],
      queryFn: () => getBuildingLevels(),
    });

  return {
    useGetBuildingLevelDropdown,
  };
};

export default useBuildingLevelModel;
