import useHelper from "@hooks/useHelper";
import { BuildingTypeInput } from "@interfaces/buildingInterface";
import {
  addBuildingType,
  getBuildingTypeDetail,
  getBuildingTypes,
} from "@services/buildingService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQueries } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";
import moment from "moment";

const useBuildingModel = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);

  const { auth, nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildings = () =>
    useQueries({
      queries: [
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
      onError: (error) => onError(error.message),
      onSuccess: (res) => {
        showDetailModal({
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
      mutationKey: ["getBuildingTypEdit"],
      mutationFn: (name: string) => getBuildingTypeDetail(name, auth.token),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError: (error) => onError(error.message),
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
      onError: (error) => onError(error.message),
      onSuccess: (res) => {
        onSuccess(res.message);
        nav("/building");
      },
    });

  return {
    useGetBuildings,
    useAddBuildingType,
    useGetBuildingTypeDetail,
    useGetBuildingTypeEdit,
  };
};

export default useBuildingModel;
