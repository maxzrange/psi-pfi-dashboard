import { Form } from "@components/Form";
import { projectAdd } from "@services/projectService";


import { projectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useNavigate, useSearchParams } from "react-router-dom";



const AddProject = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleApi = async (data: any) => {
    try {
      const result = await projectAdd({

        name: data.name,
        description: data.description,
        address_detail: data.address_detail,
        status: data.status,
      });

      console.log("Saved:", result.data);
      navigate("/project");

    } catch (err) {
      console.error("Error submitting project:", err);
    }
  };
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
      onSubmit={handleApi}
    />
  );
};

export default AddProject;
