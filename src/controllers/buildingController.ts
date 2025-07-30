import useHelper from "@hooks/useHelper";
import useBuildingModel from "@models/buildingModel";
import { useConfirmationModal } from "@stores/modalStore";
import moment from "moment";
import { FetchDataType } from "types/pageType";
import useBuildingTypeController from "./buildingTypeController";
import useBuildingSideController from "./buildingSideController";

const useBuildingController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const { onError } = useHelper();

  const {
    useGetBuildings,
    useGetBuildingDetail,
    useGetBuildingEdit,
    useAddBuilding,
    useUpdateBuilding,
  } = useBuildingModel();

  const { getBuildingTypeEditService, deleteBuildingTypeService } =
    useBuildingTypeController();

  const { getBuildingSideEditService, deleteBuildingSideService } =
    useBuildingSideController();

  const getBuildingDetailMutation = useGetBuildingDetail();
  const getBuildingEditMutation = useGetBuildingEdit();
  const addBuildingMutation = useAddBuilding();
  const updateBuildingMutation = useUpdateBuilding();

  const useGetBuildingsService = () => {
    const responses = useGetBuildings();

    const isLoading = responses.some((res) => res.isLoading);
    const isNotExist = responses.some((res) => res.data === undefined);
    const error = responses.find((res) => res.error !== null && res);

    let finalData: FetchDataType[][] = [];

    if (!isLoading && !isNotExist) {
      if (error) {
        onError(error.error!);
      } else {
        const buildingData: FetchDataType[] = responses[0].data!.data!.data.map(
          (item) => ({
            id: item.id,
            row: [
              { type: "text", value: item.name },
              { type: "text", value: item.address },
              { type: "text", value: item.year_built },
              { type: "text", value: item.area_sq_meters },
              { type: "text", value: item.levels_count },
              { type: "text", value: item.sides_count },
              { type: "text", value: `${item.status_construction * 100}%` },
              {
                type: "text",
                value: moment(item.construction_start_date).format(
                  "ddd, DD MMM YYYY"
                ),
              },
              {
                type: "text",
                value: moment(item.construction_end_date).format(
                  "ddd, DD MMM YYYY"
                ),
              },
              {
                type: "text",
                value: moment(item.created_at).format("ddd, DD MMM YYYY"),
              },
            ],
            functions: [
              {
                type: "detail",
                onClick: () => getBuildingDetailMutation.mutate(item.id),
              },
              {
                type: "edit",
                onClick: () => getBuildingEditMutation.mutate(item.id),
              },
              { type: "delete", onClick: () => console.log("Delete") },
            ],
          })
        );

        const buildingTypeData: FetchDataType[] =
          responses[1].data!.data.data.map((item) => ({
            id: item.id,
            row: [
              { type: "text", value: item.name },
              { type: "text", value: item.description },
              {
                type: "text",
                value: moment(item.created_at).format("ddd, DD MMM YYYY"),
              },
            ],
            functions: [
              {
                type: "edit",
                onClick: () => getBuildingTypeEditService(item.name),
              },
              {
                type: "delete",
                onClick: () =>
                  showConfirmationModal({
                    title: "Delete Building Type",
                    subTitle: `Are you sure you want to delete |"${item.name}"| type? This action cannot be undo!`,
                    onConfirm: () => deleteBuildingTypeService(item.name),
                  }),
              },
            ],
          }));

        const buildingSideData: FetchDataType[] =
          responses[2].data!.data.data.map((item) => ({
            id: item.id,
            row: [
              { type: "text", value: item.name },
              { type: "text", value: item.description || "-" },
              { type: "text", value: `${item.orientation_degrees}°` },
              {
                type: "text",
                value: moment(item.created_at).format("ddd, DD MMM YYYY"),
              },
            ],
            functions: [
              {
                type: "edit",
                onClick: () => getBuildingSideEditService(item.name),
              },
              {
                type: "delete",
                onClick: () =>
                  showConfirmationModal({
                    title: "Delete Building Side",
                    subTitle: `Are you sure you want to delete |"${item.name}"| side? This action cannot be undo!`,
                    onConfirm: () => deleteBuildingSideService(item.name),
                  }),
              },
            ],
          }));

        finalData = [
          buildingData,
          buildingTypeData,
          buildingSideData,
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
    addBuildingService: (body: any) => addBuildingMutation.mutate(body),
    updateBuildingService: (data: { name: string; body: any }) =>
      updateBuildingMutation.mutate(data),
  };
};

export default useBuildingController;
