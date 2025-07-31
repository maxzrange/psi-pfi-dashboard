import { ComboBoxOption } from "@aws-amplify/ui-react";
import useHelper from "@hooks/useHelper";
import useDefectTypeModel from "@models/defectTypeModel";

const useDefectTypeController = () => {
  const { onError } = useHelper();

  const {
    useGetDefectTypeDropdown,
    useGetDefectTypeEdit,
    useAddDefectType,
    useUpdateDefectType,
    useDeleteDefectType,
  } = useDefectTypeModel();

  const getDefectTypeEditMutation = useGetDefectTypeEdit();
  const addDefectTypeMutation = useAddDefectType();
  const updateDefectTypeMutation = useUpdateDefectType();
  const deleteDefectTypeMutation = useDeleteDefectType();

  const useGetDefectTypeDropdownService = () => {
    const { data, isLoading, isError, error } = useGetDefectTypeDropdown();

    let finalData: ComboBoxOption[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = data.data.data.map(
          (item) =>
            ({
              id: item.id.toString(),
              label: item.name,
            } as ComboBoxOption)
        );
      }
    }

    return {
      finalData,
    };
  };

  return {
    useGetDefectTypeDropdownService,
    getDefectTypeEditService: (name: string) =>
      getDefectTypeEditMutation.mutate(name),
    addDefectTypeService: (body: any) => addDefectTypeMutation.mutate(body),
    updateDefectTypeService: (data: { name: string; body: any }) =>
      updateDefectTypeMutation.mutate(data),
    deleteDefectTypeService: (name: string) =>
      deleteDefectTypeMutation.mutate(name),
  };
};

export default useDefectTypeController;
