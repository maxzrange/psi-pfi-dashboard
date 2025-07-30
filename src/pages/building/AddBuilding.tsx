import { Form } from "@components/Form";
import useBuildingController from "@controllers/buildingController";
import useBuildingTypeController from "@controllers/buildingTypeController";
import useProjectController from "@controllers/projectController";
import { buildingForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddBuilding = () => {
  const [searchParams] = useSearchParams();

  const { addBuildingService, updateBuildingService } = useBuildingController();
  const { useGetProjectDropdownService } = useProjectController();
  const { useGetBuildingTypeDropdownService } = useBuildingTypeController();

  const projectDropdown = useGetProjectDropdownService();
  const buildingTypeDropdown = useGetBuildingTypeDropdownService();

  return (
    <Form
      formData={{
        ...buildingForm,
        inputs: buildingForm.inputs.map((item) => {
          if (item.name === "project_id") {
            return {
              ...item,
              items: [...item.items!, ...projectDropdown.finalData],
            };
          } else if (item.name === "building_type") {
            return {
              ...item,
              items: [...item.items!, ...buildingTypeDropdown.finalData],
            };
          }

          return item;
        }),
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
