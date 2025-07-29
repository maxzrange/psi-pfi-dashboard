import { Tables } from "@components/Table";
import useBuildingController from "@controllers/buildingController";
import { buildingData } from "@utils/constants/page";

const Building = () => {
  const { useGetBuildingsService } = useBuildingController();

  const { finalData, isLoading } = useGetBuildingsService();

  return (
    <Tables
      tableData={buildingData}
      fetchData={finalData}
      isLoading={isLoading}
    />
  );
};

export default Building;
