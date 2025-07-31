import { Tables } from "@components/Table";
import useDefectController from "@controllers/defectController";
import { defectData } from "@utils/constants/page";

const Defect = () => {
  const { useGetDefectsService } = useDefectController();

  const { finalData, isLoading } = useGetDefectsService();

  return (
    <Tables
      tableData={defectData}
      fetchData={finalData}
      isLoading={isLoading}
    />
  );
};

export default Defect;
