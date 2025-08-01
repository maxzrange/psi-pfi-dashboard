import useHelper from "@hooks/useHelper";
import useBuildingModel from "@models/buildingModel";
import { useConfirmationModal } from "@stores/modalStore";
import moment from "moment";
import { FetchDataType } from "types/pageType";
import useBuildingTypeController from "./buildingTypeController";
import { ComboBoxOption } from "@aws-amplify/ui-react";

const useBuildingController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const { onError } = useHelper();

  const {
    useGetBuildings,
    useGetBuildingDropdown,
    useGetBuildingDetail,
    useGetBuildingEdit,
    useAddBuilding,
    useUpdateBuilding,
    useDeleteBuilding,
  } = useBuildingModel();

  const { getBuildingTypeEditService, deleteBuildingTypeService } =
    useBuildingTypeController();

  const getBuildingDetailMutation = useGetBuildingDetail();
  const getBuildingEditMutation = useGetBuildingEdit();
  const addBuildingMutation = useAddBuilding();
  const updateBuildingMutation = useUpdateBuilding();
  const deleteBuildingMutation = useDeleteBuilding();

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
              { type: "text", value: `${item.status_construction}%` },
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
              {
                type: "delete",
                onClick: () =>
                  showConfirmationModal({
                    title: "Delete Building",
                    subTitle: `Are you sure you want to delete |"${item.name}"| building? This action cannot be undo!`,
                    onConfirm: () => deleteBuildingMutation.mutate(item.name),
                  }),
              },
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

        finalData = [buildingData, buildingTypeData] as FetchDataType[][];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  const useGetBuildingDropdownService = () => {
    const { data, isLoading, isError, error } = useGetBuildingDropdown();

    let finalData: ComboBoxOption[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = data.data.data.map((item) => ({
          id: item.id.toString(),
          label: item.name,
        }));
      }
    }

    return {
      finalData,
    };
  };

  return {
    useGetBuildingsService,
    useGetBuildingDropdownService,
    addBuildingService: (body: any) => addBuildingMutation.mutate(body),
    updateBuildingService: (data: { name: string; body: any }) =>
      updateBuildingMutation.mutate(data),
  };
};

export default useBuildingController;
