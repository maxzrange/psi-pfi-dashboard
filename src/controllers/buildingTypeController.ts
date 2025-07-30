import { ComboBoxOption } from "@aws-amplify/ui-react";
import useHelper from "@hooks/useHelper";
import useBuildingTypeModel from "@models/buildingTypeModel";

const useBuildingTypeController = () => {
  const { onError } = useHelper();

  const {
    useGetBuildingTypeDropdown,
    useGetBuildingTypeEdit,
    useAddBuildingType,
    useUpdateBuildingType,
    useDeleteBuildingType,
  } = useBuildingTypeModel();

  const getBuildingTypeEditMutation = useGetBuildingTypeEdit();
  const addBuildingTypeMutation = useAddBuildingType();
  const updateBuildingTypeMutation = useUpdateBuildingType();
  const deleteBuildingTypeMutation = useDeleteBuildingType();

  const useGetBuildingTypeDropdownService = () => {
    const { data, isLoading, isError, error } = useGetBuildingTypeDropdown();

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
    useGetBuildingTypeDropdownService,
    getBuildingTypeEditService: (name: string) =>
      getBuildingTypeEditMutation.mutate(name),
    addBuildingTypeService: (body: any) => addBuildingTypeMutation.mutate(body),
    updateBuildingTypeService: (data: { name: string; body: any }) =>
      updateBuildingTypeMutation.mutate(data),
    deleteBuildingTypeService: (name: string) =>
      deleteBuildingTypeMutation.mutate(name),
  };
};

export default useBuildingTypeController;
