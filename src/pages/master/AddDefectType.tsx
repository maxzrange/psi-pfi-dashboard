import { Form } from "@components/Form";
import useDefectTypeController from "@controllers/defectTypeController";
import { defectTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddDefectType = () => {
  const [searchParams] = useSearchParams();

  const { addDefectTypeService, updateDefectTypeService } =
    useDefectTypeController();

  return (
    <Form
      formData={{
        ...defectTypeForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : defectTypeForm.defaultValues,
      }}
      onSubmit={(data) => {
        if (searchParams.get("data")) {
          const param = JSON.parse(
            generateDecryption(decodeURIComponent(searchParams.get("data")!))
          );

          updateDefectTypeService({ body: data, name: param.name });
        } else {
          addDefectTypeService(data);
        }
      }}
    />
  );
};

export default AddDefectType;
