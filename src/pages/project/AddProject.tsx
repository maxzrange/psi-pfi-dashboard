import { Form } from "@components/Form";
import useProjectController from "@controllers/projectController";
import { projectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddProject = () => {
  const [searchParams] = useSearchParams();

  const { addProjectService, updateProjectService } = useProjectController();

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
      onSubmit={(data) => {
        if (searchParams.get("data")) {
          const param = JSON.parse(
            generateDecryption(decodeURIComponent(searchParams.get("data")!))
          );

          updateProjectService({ body: data, name: param.name });
        } else {
          addProjectService(data);
        }
      }}
    />
  );
};

export default AddProject;
