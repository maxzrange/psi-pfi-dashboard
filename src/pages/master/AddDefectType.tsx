import { Form } from "@components/Form";
import { defectTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddDefectType = () => {
  const [searchParams] = useSearchParams();

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
    />
  );
};

export default AddDefectType;
