import { Form } from "@components/Form";
import { buildingLevelForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuildingLevel = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      formData={{
        ...buildingLevelForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : buildingLevelForm.defaultValues,
      }}
    />
  );
};

export default AddBuildingLevel;
