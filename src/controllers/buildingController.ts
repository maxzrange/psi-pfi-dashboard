import { mockBuildingData } from "@data/mock";
import { BuildingDTO } from "@interfaces/buildingInterface";
import { FetchDataType } from "types/pageType";

const useBuildingController = () => {
  const useGetBuildingsService = () => {
    const data: BuildingDTO[] = mockBuildingData(10);

    let finalData: FetchDataType[] = [];

    if (data) {
      finalData = data.map((item) => ({
        id: item.id,
        row: [
          { type: "text", value: item.name },
          { type: "text", value: item.created_at },
        ],
        functions: [
          { type: "edit", onClick: () => console.log("Edit") },
          { type: "delete", onClick: () => console.log("Delete") },
        ],
      })) as FetchDataType[];
    }

    return {
      finalData,
    };
  };

  return {
    useGetBuildingsService,
  };
};

export default useBuildingController;
