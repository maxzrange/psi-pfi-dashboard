import { mockProjectsData } from "@data/mock";
import { ProjectInput } from "@interfaces/projectInterface";
import useProjectModel from "@models/projectModel";
import { useConfirmationModal, useDetailModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";

const useProjectController = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const { useGetProjects, useAddProject, useDeleteProject } = useProjectModel();

  const addProjectMutation = useAddProject();
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
              type: "detail",
              onClick: () => {
                const data = mockProjectsData(1);

                showDetailModal({
                  title: "Project Detail",
                  data: [
                    { type: "text", label: "Title", value: data[0].name },
                    {
                      type: "textarea",
                      label: "Description",
                      value: data[0].description,
                    },
                    {
                      type: "text",
                      label: "PIC",
                      value: data[0].created_by,
                    },
                    {
                      type: "text",
                      label: "Created",
                      value: data[0].created_at,
                    },
                  ],
                });
              },
            },
            {
              type: "edit",
              onClick: () => {
                const data = mockProjectsData(1);

                const defaultValues: ProjectInput = {
                  name: data[0].name,
                  description: data[0].description,
                  status: data[0].status.toString(),
                };

                nav(
                  `/project/form?data=${encodeURIComponent(
                    generateEncryption(JSON.stringify(defaultValues))
                  )}`
                );
              },
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

  return {
    useGetProjectsService,
    addProjectService: (body: any) => addProjectMutation.mutate(body),
  };
};

export default useProjectController;
