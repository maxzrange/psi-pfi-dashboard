import { Tables } from "@components/Table";
import useProjectController from "@controllers/projectController";
import { buildingData } from "@utils/constants/page";

const Building = () => {
  const { useGetProjectsService } = useProjectController();

  const { finalData } = useGetProjectsService();

  return <Tables tableData={buildingData} fetchData={finalData} />;
};

export default Building;
