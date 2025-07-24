import { Form } from "@components/Form";
import useBuildingController from "@controllers/buildingController";
import { buildingTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuildingType = () => {
  const [searchParams] = useSearchParams();

  const { addBuildingTypeService } = useBuildingController();

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
      onSubmit={addBuildingTypeService}
    />
  );
};

export default AddBuildingType;
