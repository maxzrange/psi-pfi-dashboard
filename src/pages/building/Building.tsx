import { Tables } from "@components/Table";
import useBuildingController from "@controllers/buildingController";
import { buildingData } from "@utils/constants/page";

const Building = () => {
  const { useGetBuildingsService } = useBuildingController();

  const { finalData } = useGetBuildingsService();

  return <Tables tableData={buildingData} fetchData={finalData} />;
};

export default Building;
