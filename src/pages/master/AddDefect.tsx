import { Form } from "@components/Form";
import { defectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddDefect = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      formData={{
        ...defectForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : defectForm.defaultValues,
      }}
    />
  );
};

export default AddDefect;
