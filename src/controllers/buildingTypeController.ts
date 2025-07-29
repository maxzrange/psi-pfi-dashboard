import useBuildingTypeModel from "@models/buildingTypeModel";

const useBuildingTypeController = () => {
  const {
    useGetBuildingTypeEdit,
    useAddBuildingType,
    useUpdateBuildingType,
    useDeleteBuildingType,
  } = useBuildingTypeModel();

  const getBuildingTypeEditMutation = useGetBuildingTypeEdit();
  const addBuildingTypeMutation = useAddBuildingType();
  const updateBuildingTypeMutation = useUpdateBuildingType();
  const deleteBuildingTypeMutation = useDeleteBuildingType();

  return {
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
