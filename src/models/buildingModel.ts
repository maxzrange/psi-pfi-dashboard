import useHelper from "@hooks/useHelper";
import { getBuildingDetail, getBuildings } from "@services/buildingService";
import { getBuildingSides } from "@services/buildingSideService";
import { getBuildingTypes } from "@services/buildingTypeService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQueries } from "@tanstack/react-query";
import moment from "moment";

const useBuildingModel = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);

  const { auth, onMutate, onSettled, onError } = useHelper();

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
        {
          queryKey: ["getBuildingSides"],
          queryFn: () => getBuildingSides(auth.token),
        },
      ],
    });

  const useGetBuildingDetail = () =>
    useMutation({
      mutationKey: ["getBuildingDetail"],
      mutationFn: (id: number) => getBuildingDetail(id, auth.token),
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

  return {
    useGetBuildings,
    useGetBuildingDetail,
  };
};

export default useBuildingModel;
