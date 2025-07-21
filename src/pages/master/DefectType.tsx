import { Tables } from "@components/Table";
import useDefectController from "@controllers/defectController";
import { defectTypeData } from "@utils/constants/page";

const DefectType = () => {
  const { useGetDefectTypesService } = useDefectController();

  const { finalData } = useGetDefectTypesService();

  return <Tables tableData={defectTypeData} fetchData={finalData} />;
};

export default DefectType;
