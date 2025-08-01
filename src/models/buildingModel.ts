import useHelper from "@hooks/useHelper";
import { BuildingInput } from "@interfaces/buildingInterface";
import {
  addBuilding,
  deleteBuilding,
  getBuildingDetail,
  getBuildings,
  updateBuilding,
} from "@services/buildingService";
import { getBuildingSides } from "@services/buildingSideService";
import { getBuildingTypes } from "@services/buildingTypeService";
import { useConfirmationModal, useDetailModal } from "@stores/modalStore";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";
import moment from "moment";

const useBuildingModel = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const queryClient = useQueryClient();

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildings = () =>
    useQueries({
      queries: [
        {
          queryKey: ["getBuildings"],
          queryFn: () => getBuildings(),
        },
        {
          queryKey: ["getBuildingTypes"],
          queryFn: () => getBuildingTypes(),
        },
        {
          queryKey: ["getBuildingSides"],
          queryFn: () => getBuildingSides(),
        },
      ],
    });

  const useGetBuildingDropdown = () =>
    useQuery({
      queryKey: ["getBuildingDropdown"],
      queryFn: () => getBuildings(),
    });

  const useGetBuildingDetail = () =>
    useMutation({
      mutationKey: ["getBuildingDetail"],
      mutationFn: (id: number) => getBuildingDetail(id),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        showDetailModal({
          title: "Building Detail",
          data: [
            { type: "text", label: "Name", value: res.data.name },
            { type: "text", label: "Address", value: res.data.address },
            {
              type: "text",
              label: "Year Built",
              value: res.data.year_built.toString(),
            },
            {
              type: "text",
              label: "Area (m²)",
              value: res.data.area_sq_meters.toString(),
            },
            {
              type: "text",
              label: "Number of Levels",
              value: res.data.levels_count.toString(),
            },
            {
              type: "text",
              label: "Number of Sides",
              value: res.data.sides_count.toString(),
            },
            {
              type: "map",
              label: "Location",
              value: {
                lat: res.data.latitude,
                lng: res.data.longitude,
                area: "-",
                description: "-",
              },
            },
            {
              type: "text",
              label: "Construction Status",
              value: `${res.data.status_construction * 100}%`,
            },
            {
              type: "text",
              label: "Start Date",
              value: moment(res.data.construction_start_date).format(
                "ddd, DD MMM YYYY"
              ),
            },
            {
              type: "text",
              label: "End Date",
              value: moment(res.data.construction_end_date).format(
                "ddd, DD MMM YYYY"
              ),
            },
            {
              type: "accordion",
              label: "Project",
              value: [
                { type: "text", label: "Name", value: res.data.project?.name },
                {
                  type: "textarea",
                  label: "Description",
                  value: res.data.project?.description,
                },
                {
                  type: "text",
                  label: "Address",
                  value: res.data.project?.address_detail,
                },
                {
                  type: "text",
                  label: "Status",
                  value: [
                    { label: "", id: "" },
                    { label: "Pending", id: "1" },
                    { label: "Rejected", id: "2" },
                    { label: "Accepted", id: "3" },
                  ].find(
                    (item) => item.id === res.data.project?.status.toString()
                  )!.label,
                },
              ],
            },
          ],
        });
      },
    });

  const useGetBuildingEdit = () =>
    useMutation({
      mutationKey: ["getBuildingEdit"],
      mutationFn: (id: number) => getBuildingDetail(id),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: BuildingInput = {
          name: res.data.name,
          address: res.data.address,
          year_built: res.data.year_built.toString(),
          building_type: { id: "1", label: "Type A" },
          area_sq_meters: res.data.area_sq_meters,
          levels_count: res.data.levels_count,
          sides_count: res.data.sides_count,
          owner: "",
          project_id: {
            id: res.data.project!.id.toString(),
            label: res.data.project!.name,
          },
          location: {
            lat: res.data.latitude,
            lng: res.data.longitude,
            area: "-",
            description: "-",
          },
          status_construction: res.data.status_construction,
          construction_start_date: moment(
            res.data.construction_start_date.slice(0, 10)
          ).format("YYYY-MM-DD"),
          construction_end_date: moment(
            res.data.construction_end_date.slice(0, 10)
          ).format("YYYY-MM-DD"),
          buildingData: [[], []],
        };

        nav(
          `/building/form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddBuilding = () =>
    useMutation({
      mutationKey: ["addBuilding"],
      mutationFn: (body: BuildingInput) => addBuilding(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        onSuccess(res.message);
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildings"] });
      },
    });

  const useUpdateBuilding = () =>
    useMutation({
      mutationKey: ["updateBuilding"],
      mutationFn: (data: { name: string; body: BuildingInput }) =>
        updateBuilding(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        onSuccess(res.message);
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildings"] });
      },
    });

  const useDeleteBuilding = () =>
    useMutation({
      mutationKey: ["deleteBuilding"],
      mutationFn: (name: string) => deleteBuilding(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getBuildings"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetBuildings,
    useGetBuildingDropdown,
    useGetBuildingDetail,
    useGetBuildingEdit,
    useAddBuilding,
    useUpdateBuilding,
    useDeleteBuilding,
  };
};

export default useBuildingModel;
