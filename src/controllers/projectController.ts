import { mockProjectsData } from "@data/mock";
import { ProjectDTO } from "@interfaces/projectInterface";
import { useDetailModal } from "@stores/modalStore";
import { FetchDataType } from "types/pageType";

const useProjectController = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);

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
          { type: "edit", onClick: () => console.log("edit") },
          { type: "delete", onClick: () => console.log("delete") },
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
