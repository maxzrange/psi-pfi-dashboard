import useHelper from "@hooks/useHelper";
import {
  BuildingInput,
  BuildingTypeInput,
} from "@interfaces/buildingInterface";
import {
  addBuildingType,
  deleteBuildingType,
  getBuildings,
  getBuildingTypeDetail,
  getBuildingTypes,
  updateBuildingType,
} from "@services/buildingService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQueries } from "@tanstack/react-query";
import { queryClient } from "@utils/configs/client";
import { generateEncryption } from "@utils/helpers/generator";
import moment from "moment";

const useBuildingModel = () => {
  const detailModal = useDetailModal();

  const { auth, nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildings = () =>
    useQueries({
      queries: [
        {
          queryKey: ["getBuildings"],
          queryFn: () => getBuildings(auth.token),
        },
        {
          queryKey: ["getBuildingTypes"],
          queryFn: () => getBuildingTypes(auth.token),
        },
      ],
    });

  const useGetBuildingTypeDetail = () =>
    useMutation({
      mutationKey: ["getBuildingTypeDetail"],
      mutationFn: (name: string) => getBuildingTypeDetail(name, auth.token),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        detailModal.showModal({
          title: "Building Type Detail",
          data: [
            { type: "text", label: "Name", value: res.data.name },
            {
              type: "textarea",
              label: "Description",
              value: res.data.description!,
            },
            {
              type: "text",
              label: "Created At",
              value: moment(res.data.created_at).format("ddd, DD MMM YYYY"),
            },
          ],
        });
      },
    });

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
          description: res.data.description ?? "",
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
        onSuccess(res.message);
        nav("/building");
      },
    });

  const useUpdateBuildingType = () =>
    useMutation({
      mutationKey: ["updateBuildingType"],
      mutationFn: (data: { body: BuildingInput; name: string }) =>
        updateBuildingType(data.body, data.name, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        onSuccess(res.message);
        nav("/building");
        queryClient.refetchQueries({ queryKey: ["getBuildingTypes"] });
      },
    });

  const useDeleteBuildingType = () =>
    useMutation({
      mutationKey: ["deleteBuildingType"],
      mutationFn: (name: string) => deleteBuildingType(name, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => {
        detailModal.hideModal();
        onError(error);
      },
      onSuccess: (res) => {
        detailModal.hideModal();
        onSuccess(res.message);
        queryClient.refetchQueries({ queryKey: ["getBuildingTypes"] });
      },
    });

  return {
    useGetBuildings,
    useGetBuildingTypeDetail,
    useGetBuildingTypeEdit,
    useAddBuildingType,
    useUpdateBuildingType,
    useDeleteBuildingType,
  };
};

export default useBuildingModel;
