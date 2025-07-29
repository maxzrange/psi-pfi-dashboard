import useHelper from "@hooks/useHelper";
import { BuildingTypeInput } from "@interfaces/buildingTypeInterface";
import {
  addBuildingType,
  deleteBuildingType,
  getBuildingTypeDetail,
  updateBuildingType,
} from "@services/buildingTypeService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";

const useBuildingTypeModel = () => {
  const hideDetailModal = useDetailModal((state) => state.hideModal);

  const queryClient = useQueryClient();

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildingTypeEdit = () =>
    useMutation({
      mutationKey: ["getBuildingTypeEdit"],
      mutationFn: (name: string) => getBuildingTypeDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: BuildingTypeInput = {
          name: res.data.name,
          description: res.data.description,
        };

        nav(
          `/building/type-form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddBuildingType = () =>
    useMutation({
      mutationKey: ["addBuildingType"],
      mutationFn: (body: BuildingTypeInput) => addBuildingType(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
      },
    });

  const useUpdateBuildingType = () =>
    useMutation({
      mutationKey: ["updateBuildingType"],
      mutationFn: (data: { name: string; body: BuildingTypeInput }) =>
        updateBuildingType(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        onSuccess(res.message);
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
      },
    });

  const useDeleteBuildingType = () =>
    useMutation({
      mutationKey: ["deleteBuildingType"],
      mutationFn: (name: string) => deleteBuildingType(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideDetailModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideDetailModal();
        onSuccess(res.message);
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
      },
    });

  return {
    useGetBuildingTypeEdit,
    useAddBuildingType,
    useUpdateBuildingType,
    useDeleteBuildingType,
  };
};

export default useBuildingTypeModel;
