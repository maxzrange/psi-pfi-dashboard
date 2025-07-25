import { Tables } from "@components/Table";
import useProjectController from "@controllers/projectController";
import { projectData } from "@utils/constants/page";

const Project = () => {
  const { useGetProjectsService } = useProjectController();

  const { finalData, isLoading } = useGetProjectsService();

  return (
    <Tables
      tableData={projectData}
      fetchData={finalData}
      isLoading={isLoading}
    />
  );
};

export default Project;
