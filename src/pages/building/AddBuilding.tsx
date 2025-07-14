import { Form } from "@components/Form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";
import { buildingForm } from "src/utils/constants/form";

const AddBuilding = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      formData={{
        ...buildingForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : buildingForm.defaultValues,
      }}
    />
  );
};

export default AddBuilding;
