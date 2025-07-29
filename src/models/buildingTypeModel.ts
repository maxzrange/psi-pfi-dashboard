import useHelper from "@hooks/useHelper";
import { BuildingTypeInput } from "@interfaces/buildingTypeInterface";
import {
  addBuildingType,
  deleteBuildingType,
  getBuildingTypeDetail,
  updateBuildingType,
} from "@services/buildingTypeService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/configs/client";
import { generateEncryption } from "@utils/helpers/generator";

const useBuildingTypeModel = () => {
  const hideDetailModal = useDetailModal((state) => state.hideModal);

  const { nav, auth, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildingTypeEdit = () =>
    useMutation({
      mutationKey: ["getBuildingTypeEdit"],
      mutationFn: (name: string) => getBuildingTypeDetail(name, auth.token),
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
      mutationFn: (body: BuildingTypeInput) =>
        addBuildingType(body, auth.token),
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
        updateBuildingType(data.name, data.body, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
      },
    });

  const useDeleteBuildingType = () =>
    useMutation({
      mutationKey: ["deleteBuildingType"],
      mutationFn: (name: string) => deleteBuildingType(name, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideDetailModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideDetailModal();
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
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
