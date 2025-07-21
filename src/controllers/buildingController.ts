import { mockBuildingData, mockBuildingTypeData } from "@data/mock";
import {
  BuildingDTO,
  BuildingInput,
  BuildingTypeDTO,
} from "@interfaces/buildingInterface";
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
    const building: BuildingDTO[] = mockBuildingData(10);
    const buildingType: BuildingTypeDTO[] = mockBuildingTypeData(10);

    let finalData: FetchDataType[][] = [];

    if (building && buildingType)
      finalData = [
        building.map((item) => ({
          id: item.id,
          row: [
            { type: "text", value: item.name },
            { type: "text", value: item.address },
            { type: "text", value: item.year_built },
            { type: "text", value: item.building_type },
            { type: "text", value: item.area },
            { type: "text", value: item.levels },
            { type: "text", value: item.elevation },
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
        })),
        buildingType.map((item) => ({
          id: item.id,
          row: [
            { type: "text", value: item.name },
            { type: "text", value: item.description },
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
        })),
        [],
        [],
      ] as FetchDataType[][];

    return {
      finalData,
    };
  };

  return {
    useGetBuildingsService,
  };
};

export default useBuildingController;
