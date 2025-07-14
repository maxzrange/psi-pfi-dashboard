import { mockProjectsData } from "@data/mock";
import { ProjectDTO, ProjectInput } from "@interfaces/projectInterface";
import { useConfirmationModal, useDetailModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";

const useProjectController = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const useGetProjectsService = () => {
    const data: ProjectDTO[] = mockProjectsData(10);

    let finalData: FetchDataType[] = [];

    if (data) {
      finalData = data.map((item) => ({
        id: item.id,
        row: [
          { type: "text", value: item.name },
          { type: "text", value: item.description },
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
                    label: "Customer",
                    value: data[0].customer_id,
                  },
                  { type: "text", label: "Created", value: data[0].created_at },
                  {
                    type: "map",
                    label: "Location",
                    value: {
                      lat: parseInt(data[0].latitude),
                      lng: parseInt(data[0].longtitude),
                    },
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
                location: {
                  lat: Number(data[0].latitude),
                  lng: Number(data[0].longtitude),
                },
                customer: { id: "1", label: "Tio" },
                status: {
                  id: Number(data[0].status),
                  label:
                    Number(data[0].status) === 1
                      ? "Pending"
                      : Number(data[0].status) === 2
                      ? "Rejected"
                      : "Accepted",
                },
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
            onClick: () => {
              const data = mockProjectsData(1);

              showConfirmationModal({
                title: "Delete Project",
                subTitle: `Are you sure you want to delete |"${data[0].name}"| project? This action cannot be undo!`,
              });
            },
          },
        ],
      })) as FetchDataType[];
    }

    return {
      finalData,
    };
  };

  return {
    useGetProjectsService,
  };
};

export default useProjectController;
