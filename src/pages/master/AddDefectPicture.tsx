import { Form } from "@components/Form";
import useBuildingController from "@controllers/buildingController";
import useBuildingLevelController from "@controllers/buildingLevelController";
import useBuildingSideController from "@controllers/buildingSideController";
import { DefectPicIput } from "@interfaces/defectInterface";
import { useDocumentModal } from "@stores/modalStore";
import { defectPicForm } from "@utils/constants/form";

const AddDefectPicture = () => {
  const showDocumentModal = useDocumentModal((state) => state.showModal);

  const { useGetBuildingDropdownService } = useBuildingController();
  const { useGetBuildingSideDropdownService } = useBuildingSideController();
  const { useGetBuildingLevelDropdownService } = useBuildingLevelController();

  const building = useGetBuildingDropdownService();
  const buildingSide = useGetBuildingSideDropdownService();
  const buildingLevel = useGetBuildingLevelDropdownService();

  return (
    <Form
      formData={{
        ...defectPicForm,
        inputs: defectPicForm.inputs.map((input) => {
          if (input.name === "reports") {
            return {
              ...input,
              cartData: {
                ...input.cartData!,
                inputs: input.cartData!.inputs.map((item) => {
                  if (item.name === "side_id") {
                    return {
                      ...item,
                      items: [...item.items!, ...buildingSide.finalData],
                    };
                  } else if (item.type === "cart") {
                    return {
                      ...item,
                      cartData: {
                        ...item.cartData!,
                        inputs: item.cartData!.inputs.map((item2) => {
                          if (
                            item2.name === "level_from_id" ||
                            item2.name === "level_to_id"
                          ) {
                            return {
                              ...item2,
                              items: [
                                ...item2.items!,
                                ...buildingLevel.finalData,
                              ],
                            };
                          }

                          return item2;
                        }),
                      },
                    };
                  }

                  return item;
                }),
              },
            };
          } else if (input.name === "building_id") {
            return {
              ...input,
              items: [...input.items!, ...building.finalData],
            };
          }

          return input;
        }),
      }}
      onPreview={(data) =>
        showDocumentModal(
          (data as DefectPicIput).reports.map((item) => ({
            title: item.side_id?.label ?? "",
            detail: `General view of building exterior ${
              item.side_id?.label ?? ""
            }`,
            observation: "No defect has been observed",
            defect: "Safe",
            image: item.side_image.map((image) => image.preview),
            table: item.levels.map((level) => ({
              detail: `View of building exterior ${item.side_id?.label ?? ""} ${
                level.level_from_id?.label ?? ""
              }${level.level_to_id ? ` - ${level.level_to_id.label}` : ""}`,
              observation: "No defect has been observed",
              defect: "Safe",
              images: level.images.map((image) => image.preview),
            })),
          })),
          "defect"
        )
      }
    />
  );
};

export default AddDefectPicture;
