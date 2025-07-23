import {
  mockBuildingData,
  mockBuildingLevelData,
  mockBuildingSideData,
  mockBuildingTypeData,
} from "@data/mock";
import {
  BuildingDTO,
  BuildingInput,
  BuildingLevelDTO,
  BuildingLevelInput,
  BuildingSideDTO,
  BuildingSideInput,
  BuildingTypeDTO,
  BuildingTypeInput,
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
    const buildingSide: BuildingSideDTO[] = mockBuildingSideData(10);
    const buildingLevel: BuildingLevelDTO[] = mockBuildingLevelData(10);

    let finalData: FetchDataType[][] = [];

    if (building && buildingType) {
      const buildingData: FetchDataType[] = building.map((item) => ({
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
                address: data[0].address,
                year_built: data[0].year_built,
                building_type_id: { id: "4", label: data[0].building_type },
                area: data[0].area,
                levels: data[0].levels,
                elevation: data[0].elevation,
                facade: data[0].facade,
                user_id: { id: "1", label: "Tio" },
                location: data[0].location,
                cons_status: data[0].cons_status,
                cons_start: data[0].cons_start,
                cons_end: data[0].cons_end,
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
      }));

      const buildingTypeData: FetchDataType[] = buildingType.map((item) => ({
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
              const data = mockBuildingTypeData(1);

              const defaultValues: BuildingTypeInput = {
                name: data[0].name,
                description: data[0].description,
              };

              nav(
                `/building/type-form?data=${encodeURIComponent(
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
                title: "Delete Building Type",
                subTitle: `Are you sure you want to delete |"${data[0].name}"| type? This action cannot be undo!`,
              });
            },
          },
        ],
      }));

      const buildingSideData: FetchDataType[] = buildingSide.map((item) => ({
        id: item.id,
        row: [
          { type: "text", value: item.name },
          { type: "text", value: item.building },
          { type: "text", value: item.orientation },
          { type: "text", value: item.created_at },
        ],
        functions: [
          {
            type: "edit",
            onClick: () => {
              const data = mockBuildingSideData(1);

              const defaultValues: BuildingSideInput = {
                name: data[0].name,
                building_id: {
                  id: "4",
                  label: data[0].building,
                },
                description: data[0].description,
                orientation: data[0].orientation,
              };

              nav(
                `/building/side-form?data=${encodeURIComponent(
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
                title: "Delete Building Side",
                subTitle: `Are you sure you want to delete |"${data[0].name}"| side? This action cannot be undo!`,
              });
            },
          },
        ],
      }));

      const buildingLevelData: FetchDataType[] = buildingLevel.map((item) => ({
        id: item.id,
        row: [
          { type: "text", value: item.building },
          { type: "text", value: item.level_num },
          { type: "text", value: item.usage },
        ],
        functions: [
          {
            type: "edit",
            onClick: () => {
              const data = mockBuildingLevelData(1);

              const defaultValues: BuildingLevelInput = {
                building_id: {
                  id: "4",
                  label: data[0].building,
                },
                level_num: data[0].level_num,
                description: data[0].description,
                usage: data[0].usage,
              };

              nav(
                `/building/level-form?data=${encodeURIComponent(
                  generateEncryption(JSON.stringify(defaultValues))
                )}`
              );
            },
          },
          {
            type: "delete",
            onClick: () => {
              const data = mockBuildingLevelData(1);

              showConfirmationModal({
                title: "Delete Building Level",
                subTitle: `Are you sure you want to delete |"${data[0].building} lvl ${data[0].level_num}"|? This action cannot be undo!`,
              });
            },
          },
        ],
      }));

      finalData = [
        buildingData,
        buildingTypeData,
        buildingSideData,
        buildingLevelData,
      ] as FetchDataType[][];
    }

    return {
      finalData,
    };
  };

  return {
    useGetBuildingsService,
  };
};

export default useBuildingController;
