import { mockBuildingData } from "@data/mock";
import { BuildingDTO, BuildingInput } from "@interfaces/buildingInterface";
import { useConfirmationModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";

const useBuildingController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const useGetBuildingsService = () => {
    const data: BuildingDTO[] = mockBuildingData(10);

    let finalData: FetchDataType[] = [];

    if (data)
      finalData = data.map((item) => ({
        id: item.id,
        row: [
          { type: "text", value: item.name },
          { type: "text", value: item.created_at },
        ],
        functions: [
          {
            type: "edit",
            onClick: () => {
              const data = mockBuildingData(1);

              const defaultValues: BuildingInput = {
                name: data[0].name,
                location: null,
              };

              nav(
                `/building/form?data=${encodeURIComponent(
                  generateEncryption(JSON.stringify(defaultValues))
                )}`
              );
            },
          },
          {
            type: "delete",
            onClick: () => {
              const data = mockBuildingData(1);

              showConfirmationModal({
                title: "Delete Building",
                subTitle: `Are you sure you want to delete |"${data[0].name}"| building? This action cannot be undo!`,
              });
            },
          },
        ],
      })) as FetchDataType[];

    return {
      finalData,
    };
  };

  return {
    useGetBuildingsService,
  };
};

export default useBuildingController;
