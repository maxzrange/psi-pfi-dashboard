import {
  mockBuildingData,
  mockBuildingLevelData,
  mockBuildingSideData,
} from "@data/mock";
import {
  BuildingDTO,
  BuildingInput,
  BuildingLevelDTO,
  BuildingLevelInput,
  BuildingSideDTO,
  BuildingSideInput,
} from "@interfaces/buildingInterface";
import useBuildingModel from "@models/buildingModel";
import { useConfirmationModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";

const useBuildingController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const {
    useGetBuildings,
    useGetBuildingTypeDetail,
    useGetBuildingTypeEdit,
    useAddBuildingType,
  } = useBuildingModel();

  const getBuildingTypeDetailMutation = useGetBuildingTypeDetail();
  const getBuildingTypeEditMutation = useGetBuildingTypeEdit();
  const addBuildingTypeMutation = useAddBuildingType();

  const useGetBuildingsService = () => {
    const responses = useGetBuildings();

    const isLoading = responses.some((res) => res.isLoading);
    const isNotExist = responses.some((res) => res.data === undefined);

    let finalData: FetchDataType[][] = [];

    if (!isLoading && !isNotExist) {
      const building: BuildingDTO[] = mockBuildingData(10);
      const buildingSide: BuildingSideDTO[] = mockBuildingSideData(10);
      const buildingLevel: BuildingLevelDTO[] = mockBuildingLevelData(10);

      if (building && buildingLevel) {
        const buildingData: FetchDataType[] = building.map((item) => ({
          id: item.id,
          row: [
            { type: "text", value: item.project_id },
            { type: "text", value: item.name },
            { type: "text", value: item.address },
            { type: "text", value: item.year_built },
            { type: "text", value: item.building_type },
            { type: "text", value: item.area_sq_meters },
            { type: "text", value: item.levels_count },
            { type: "text", value: item.sides_count },
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
                  building_type: { id: "4", label: data[0].building_type },
                  area_sq_meters: data[0].area_sq_meters,
                  levels_count: data[0].levels_count,
                  sides_count: data[0].sides_count,
                  owner_id: { id: "1", label: "Tio" },
                  project_id: { id: "4", label: data[0].project_id },
                  location: {
                    lat: data[0].latitude,
                    lng: data[0].longitude,
                    area: "-",
                    description: "-",
                  },
                  status_construction: data[0].status_construction,
                  construction_start_date: data[0].construction_start_date,
                  construction_end_date: data[0].construction_end_date,
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

        const buildingTypeData: FetchDataType[] =
          responses[0].data!.data.data.map((item) => ({
            id: item.id,
            row: [
              { type: "text", value: item.name },
              {
                type: "text",
                value: moment(item.created_at).format("ddd, DD MMM YYYY"),
              },
            ],
            functions: [
              {
                type: "detail",
                onClick: () => getBuildingTypeDetailMutation.mutate(item.name),
              },
              {
                type: "edit",
                onClick: () => getBuildingTypeEditMutation.mutate(item.name),
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

        const buildingLevelData: FetchDataType[] = buildingLevel.map(
          (item) => ({
            id: item.id,
            row: [
              { type: "text", value: item.building },
              { type: "text", value: item.level_num },
              { type: "text", value: item.usage },
              { type: "text", value: item.created_at },
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
          })
        );

        finalData = [
          buildingData,
          buildingTypeData,
          buildingSideData,
          buildingLevelData,
        ] as FetchDataType[][];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetBuildingsService,
    addBuildingTypeService: (body: any) => addBuildingTypeMutation.mutate(body),
  };
};

export default useBuildingController;
