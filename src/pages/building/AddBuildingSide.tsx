import { Form } from "@components/Form";
import { buildingSideForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuildingSide = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      formData={{
        ...buildingSideForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : buildingSideForm.defaultValues,
      }}
    />
  );
};

export default AddBuildingSide;
