import { Form } from "@components/Form";
import { buildingTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuildingType = () => {
  const [searchParams] = useSearchParams();

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
    />
  );
};

export default AddBuildingType;
