import useHelper from "@hooks/useHelper";
import { BuildingSideInput } from "@interfaces/buildingSideInterface";
import {
  addBuildingSide,
  deleteBuildingSide,
  getBuildingSideDetail,
  getBuildingSides,
  updateBuildingSide,
} from "@services/buildingSideService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";

const useBuildingSideModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const queryClient = useQueryClient();

  const useGetBuildingSideDropdown = () =>
    useQuery({
      queryKey: ["getBuildingSideDropdown"],
      queryFn: () => getBuildingSides(),
    });

  const useGetBuildingSideEdit = () =>
    useMutation({
      mutationKey: ["getBuildingSideEdit"],
      mutationFn: (name: string) => getBuildingSideDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: BuildingSideInput = {
          name: res.data.name,
          description: res.data.description || "",
          orientation_degrees: res.data.orientation_degrees,
        };

        nav(
          `/building/side-form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddBuildingSide = () =>
    useMutation({
      mutationKey: ["addBuildingSide"],
      mutationFn: (body: BuildingSideInput) => addBuildingSide(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingSides"] });
        onSuccess(res.message);
      },
    });

  const useUpdateBuildingSide = () =>
    useMutation({
      mutationKey: ["updateBuildingSide"],
      mutationFn: (data: { name: string; body: BuildingSideInput }) =>
        updateBuildingSide(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingSides"] });
        onSuccess(res.message);
      },
    });

  const useDeleteBuildingSide = () =>
    useMutation({
      mutationKey: ["deleteBuildingSide"],
      mutationFn: (name: string) => deleteBuildingSide(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getBuildingSides"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetBuildingSideDropdown,
    useGetBuildingSideEdit,
    useAddBuildingSide,
    useUpdateBuildingSide,
    useDeleteBuildingSide,
  };
};

export default useBuildingSideModel;
