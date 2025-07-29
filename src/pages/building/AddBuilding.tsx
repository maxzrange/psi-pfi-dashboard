import { Form } from "@components/Form";
import useBuildingController from "@controllers/buildingController";
import { buildingForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuilding = () => {
  const [searchParams] = useSearchParams();

  const { addBuildingService, updateBuildingService } = useBuildingController();

  return (
    <Form
      formData={{
        ...buildingForm,
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : searchParams.get("relate")
          ? JSON.parse(
              generateDecryption(
                decodeURIComponent(searchParams.get("relate")!)
              )
            )
          : buildingForm.defaultValues,
      }}
      onSubmit={(data) => {
        if (searchParams.get("data")) {
          const param = JSON.parse(
            generateDecryption(decodeURIComponent(searchParams.get("data")!))
          );

          updateBuildingService({ body: data, name: param.name });
        } else {
          addBuildingService(data);
        }
      }}
    />
  );
};

export default AddBuilding;
