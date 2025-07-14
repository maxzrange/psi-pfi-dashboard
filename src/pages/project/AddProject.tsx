import { Form } from "@components/Form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";
import { projectForm } from "src/utils/constants/form";

const AddProject = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      formData={{
        ...projectForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : projectForm.defaultValues,
      }}
    />
  );
};

export default AddProject;
