import { Flex } from "@aws-amplify/ui-react";
import { Tables } from "@components/Table";
import useBuildingController from "@controllers/buildingController";
import { buildingData } from "@utils/constants/page";

const Building = () => {
  const { useGetBuildingsService } = useBuildingController();

  const { finalData } = useGetBuildingsService();

  return (
    <Flex direction="column" flex={1} gap={14}>
      <Tables tableData={buildingData} fetchData={finalData} />
    </Flex>
  );
};

export default Building;
