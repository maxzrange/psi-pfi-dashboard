import { Form } from "@components/Form";
import useBuildingTypeController from "@controllers/buildingTypeController";
import { buildingTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuildingType = () => {
  const [searchParams] = useSearchParams();

  const { addBuildingTypeService, updateBuildingTypeService } =
    useBuildingTypeController();

  return (
    <Form
      formData={{
        ...buildingTypeForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : buildingTypeForm.defaultValues,
      }}
      onSubmit={(data) => {
        if (searchParams.get("data")) {
          const param = JSON.parse(
            generateDecryption(decodeURIComponent(searchParams.get("data")!))
          );

          updateBuildingTypeService({ body: data, name: param.name });
        } else {
          addBuildingTypeService(data);
        }
      }}
    />
  );
};

export default AddBuildingType;
