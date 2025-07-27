import { Form } from "@components/Form";
import { useAuth } from "@stores/authStore";

import { projectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const handleApi = async (data: any) => {
  const token = useAuth.getState().token;
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to save project");

    const result = await response.json();
    console.log("Saved:", result);
    // Optional: redirect or show success
  } catch (err) {
    console.error("Error submitting project:", err);
  }
};

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
      onSubmit={handleApi}
    />
  );
};

export default AddProject;
