import { Form } from "@components/Form";
import { buildingTypeAdd } from "@services/buildingService";
import { buildingTypeForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AddBuildingType = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleApi = async (data: any) => {
  try {
    const result = await buildingTypeAdd({
      name: data.name,
      description: data.description,
    });

    console.log("Saved:", result.data);
    navigate("/building");
    
  } catch (err) {
    console.error("Error submitting project:", err);
  }
};
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
      onSubmit={handleApi}
    />
  );
};

export default AddBuildingType;
