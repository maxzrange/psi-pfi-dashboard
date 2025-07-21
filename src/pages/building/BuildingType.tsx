import { Tables } from "@components/Table";
import useBuildingController from "@controllers/buildingController";
import { buildingTypeData } from "@utils/constants/page";

const BuildingType = () => {
  const { useGetBuildingsService } = useBuildingController();

  const { finalData } = useGetBuildingsService();

  return <Tables tableData={buildingTypeData} fetchData={finalData} />;
};

export default BuildingType;
