import { Form } from "@components/Form";
import { projectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

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
