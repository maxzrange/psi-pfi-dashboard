import { ComboBoxOption } from "@aws-amplify/ui-react";
import useHelper from "@hooks/useHelper";
import useBuildingSideModel from "@models/buildingSideModel";

const useBuildingSideController = () => {
  const { onError } = useHelper();

  const {
    useGetBuildingSideDropdown,
    useGetBuildingSideEdit,
    useUpdateBuildingSide,
    useDeleteBuildingSide,
  } = useBuildingSideModel();

  const getBuildingSideEditMutation = useGetBuildingSideEdit();
  const updateBuildingSideMutation = useUpdateBuildingSide();
  const deleteBuildingSideMutation = useDeleteBuildingSide();

  const useGetBuildingSideDropdownService = () => {
    const { data, isLoading, isError, error } = useGetBuildingSideDropdown();

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
    useGetBuildingSideDropdownService,
    getBuildingSideEditService: (name: string) =>
      getBuildingSideEditMutation.mutate(name),
    updateBuildingSideService: (data: { name: string; body: any }) =>
      updateBuildingSideMutation.mutate(data),
    deleteBuildingSideService: (name: string) =>
      deleteBuildingSideMutation.mutate(name),
  };
};

export default useBuildingSideController;
