import useHelper from "@hooks/useHelper";
import { DefectInput } from "@interfaces/defectInterface";
import {
  addDefect,
  deleteDefect,
  getDefectDetail,
  getDefects,
  updateDefect,
} from "@services/defectService";
import { getDefectTypes } from "@services/defectTypeService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation, useQueries } from "@tanstack/react-query";
import { queryClient } from "@utils/configs/client";
import { generateEncryption } from "@utils/helpers/generator";

const useDefectModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetDefects = () =>
    useQueries({
      queries: [
        { queryKey: ["getDefects"], queryFn: () => getDefects() },
        { queryKey: ["getDefectTypes"], queryFn: () => getDefectTypes() },
      ],
    });

  const useGetDefectEdit = () =>
    useMutation({
      mutationKey: ["getDefectEdit"],
      mutationFn: (name: string) => getDefectDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: DefectInput = {
          name: res.data.name,
          defect_type_id: {
            id: res.data.defect_type_id.toString(),
            label: "Defect Type A",
          },
        };

        nav(
          `/defect/form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddDefect = () =>
    useMutation({
      mutationKey: ["addDefect"],
      mutationFn: (body: DefectInput) => addDefect(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/defect");
        queryClient.invalidateQueries({ queryKey: ["getDefects"] });
        onSuccess(res.message);
      },
    });

  const useUpdateDefect = () =>
    useMutation({
      mutationKey: ["updateDefect"],
      mutationFn: (data: { name: string; body: DefectInput }) =>
        updateDefect(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/defect");
        queryClient.invalidateQueries({ queryKey: ["getDefects"] });
        onSuccess(res.message);
      },
    });

  const useDeleteDefect = () =>
    useMutation({
      mutationKey: ["deleteDefect"],
      mutationFn: (name: string) => deleteDefect(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getDefects"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetDefects,
    useGetDefectEdit,
    useAddDefect,
    useUpdateDefect,
    useDeleteDefect,
  };
};

export default useDefectModel;
