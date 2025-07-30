import useProjectModel from "@models/projectModel";
import { useConfirmationModal } from "@stores/modalStore";
import moment from "moment";
import { FetchDataType } from "types/pageType";
import { FaRegBuilding } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { generateEncryption } from "@utils/helpers/generator";
import { buildingForm } from "@utils/constants/form";
import useHelper from "@hooks/useHelper";
import { ComboBoxOption } from "@aws-amplify/ui-react";

const useProjectController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const { onError } = useHelper();

  const {
    useGetProjects,
    useGetProjectDropdown,
    useGetProjectEdit,
    useAddProject,
    useUpdateProject,
    useDeleteProject,
  } = useProjectModel();

  const getProjectEditMutation = useGetProjectEdit();
  const addProjectMutation = useAddProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const useGetProjectsService = () => {
    const { data, isLoading } = useGetProjects();

    let finalData: FetchDataType[][] = [];

    if (!isLoading && data)
      finalData = [
        data.data.data.map((item) => ({
          id: item.id,
          row: [
            { type: "text", value: item.name },
            { type: "text", value: item.description },
            { type: "text", value: item.address_detail || "-" },
            {
              type: "text",
              value: moment(item.created_at).format("ddd, DD MMM YYYY"),
            },
            {
              type: item.status
                ? item.status === 1
                  ? "pending"
                  : item.status === 2
                  ? "failed"
                  : "success"
                : "text",
              value: item.status
                ? item.status === 1
                  ? "Pending"
                  : item.status === 2
                  ? "Rejected"
                  : "Accepted"
                : "-",
            },
          ],
          functions: [
            {
              type: "custom",
              icon: FaRegBuilding,
              label: "Add Building",
              onClick: () =>
                nav(
                  `/building/form?relate=${encodeURIComponent(
                    generateEncryption(
                      JSON.stringify({
                        ...buildingForm.defaultValues,
                        project_id: { id: "1", label: "Project A" },
                      })
                    )
                  )}`
                ),
            },
            {
              type: "edit",
              onClick: () => getProjectEditMutation.mutate(item.name),
            },
            {
              type: "delete",
              onClick: () =>
                showConfirmationModal({
                  title: "Delete Project",
                  subTitle: `Are you sure you want to delete |"${item.name}"| project? This action cannot be undo!`,
                  onConfirm: () => deleteProjectMutation.mutate(item.name),
                }),
            },
          ],
        })) as FetchDataType[],
      ];

    return {
      finalData,
      isLoading,
    };
  };

  const useGetProjectDropdownService = () => {
    const { data, isLoading, isError, error } = useGetProjectDropdown();

    let finalData: ComboBoxOption[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = data.data.data.map(
          (item) =>
            ({
              id: item.id.toString(),
              label: item.name,
            } as ComboBoxOption)
        );
      }
    }

    return {
      finalData,
    };
  };

  return {
    useGetProjectsService,
    useGetProjectDropdownService,
    addProjectService: (body: any) => addProjectMutation.mutate(body),
    updateProjectService: (data: { name: string; body: any }) =>
      updateProjectMutation.mutate(data),
  };
};

export default useProjectController;
