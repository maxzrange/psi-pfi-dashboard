import useHelper from "@hooks/useHelper";
import useDefectModel from "@models/defectModel";
import moment from "moment";
import { FetchDataType } from "types/pageType";
import useDefectTypeController from "./defectTypeController";
import { useConfirmationModal } from "@stores/modalStore";

const useDefectController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const { onError } = useHelper();

  const { getDefectTypeEditService, deleteDefectTypeService } =
    useDefectTypeController();

  const {
    useGetDefects,
    useGetDefectEdit,
    useAddDefect,
    useUpdateDefect,
    useDeleteDefect,
  } = useDefectModel();

  const getDefectEditMutation = useGetDefectEdit();
  const addDefectMutation = useAddDefect();
  const updateDefectMutation = useUpdateDefect();
  const deleteDefectMutation = useDeleteDefect();

  const useGetDefectsService = () => {
    const responses = useGetDefects();

    const isLoading = responses.some((res) => res.isLoading);
    const isNotExist = responses.some((res) => res.data === undefined);
    const error = responses.find((res) => res && res.error !== null);

    let finalData: FetchDataType[][] = [];

    if (!isLoading && !isNotExist) {
      if (error) {
        onError(error.error!);
      } else {
        const defectData: FetchDataType[] = responses[0].data!.data!.data.map(
          (item) =>
            ({
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
                  type: "edit",
                  onClick: () => getDefectEditMutation.mutate(item.name),
                },
                {
                  type: "delete",
                  onClick: () =>
                    showConfirmationModal({
                      title: "Delete Defect",
                      subTitle: `Are you sure you want to delete |"${item.name}"| defect? This action cannot be undo!`,
                      onConfirm: () => deleteDefectMutation.mutate(item.name),
                    }),
                },
              ],
            } as FetchDataType)
        );

        const defectTypeData: FetchDataType[] =
          responses[1].data!.data!.data.map(
            (item) =>
              ({
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
                    type: "edit",
                    onClick: () => getDefectTypeEditService(item.name),
                  },
                  {
                    type: "delete",
                    onClick: () =>
                      showConfirmationModal({
                        title: "Delete Defect Type",
                        subTitle: `Are you sure you want to delete |"${item.name}"| type? This action cannot be undo!`,
                        onConfirm: () => deleteDefectTypeService(item.name),
                      }),
                  },
                ],
              } as FetchDataType)
          );

        finalData = [defectData, defectTypeData] as FetchDataType[][];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetDefectsService,
    addDefectService: (body: any) => addDefectMutation.mutate(body),
    updateDefectService: (data: { name: string; body: any }) =>
      updateDefectMutation.mutate(data),
  };
};

export default useDefectController;
