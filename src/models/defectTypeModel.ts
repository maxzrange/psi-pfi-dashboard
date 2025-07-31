import useHelper from "@hooks/useHelper";
import { DefectTypeInput } from "@interfaces/defectTypeInterface";
import {
  addDefectType,
  deleteDefectType,
  getDefectTypeDetail,
  getDefectTypes,
  updateDefectType,
} from "@services/defectTypeService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/configs/client";
import { generateEncryption } from "@utils/helpers/generator";

const useDefectTypeModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetDefectTypeDropdown = () =>
    useQuery({
      queryKey: ["getDefectTypeDropdown"],
      queryFn: () => getDefectTypes(),
    });

  const useGetDefectTypeEdit = () =>
    useMutation({
      mutationKey: ["getDefectTypeEdit"],
      mutationFn: (name: string) => getDefectTypeDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: DefectTypeInput = {
          name: res.data.name,
        };

        nav(
          `/defect/type-form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddDefectType = () =>
    useMutation({
      mutationKey: ["addDefectType"],
      mutationFn: (body: DefectTypeInput) => addDefectType(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/defect");
        queryClient.invalidateQueries({ queryKey: ["getDefectTypes"] });
        onSuccess(res.message);
      },
    });

  const useUpdateDefectType = () =>
    useMutation({
      mutationKey: ["updateDefectType"],
      mutationFn: (data: { name: string; body: DefectTypeInput }) =>
        updateDefectType(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/defect");
        queryClient.invalidateQueries({ queryKey: ["getDefectTypes"] });
        onSuccess(res.message);
      },
    });

  const useDeleteDefectType = () =>
    useMutation({
      mutationKey: ["deleteDefectType"],
      mutationFn: (name: string) => deleteDefectType(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getDefectTypes"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetDefectTypeDropdown,
    useGetDefectTypeEdit,
    useAddDefectType,
    useUpdateDefectType,
    useDeleteDefectType,
  };
};

export default useDefectTypeModel;
