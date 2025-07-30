import useBuildingSideModel from "@models/buildingSideModel";

const useBuildingSideController = () => {
  const {
    useGetBuildingSideEdit,
    useUpdateBuildingSide,
    useDeleteBuildingSide,
  } = useBuildingSideModel();

  const getBuildingSideEditMutation = useGetBuildingSideEdit();
  const updateBuildingSideMutation = useUpdateBuildingSide();
  const deleteBuildingSideMutation = useDeleteBuildingSide();

  return {
    getBuildingSideEditService: (name: string) =>
      getBuildingSideEditMutation.mutate(name),
    updateBuildingSideService: (data: { name: string; body: any }) =>
      updateBuildingSideMutation.mutate(data),
    deleteBuildingSideService: (name: string) =>
      deleteBuildingSideMutation.mutate(name),
  };
};

export default useBuildingSideController;
