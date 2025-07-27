import { useState, useEffect } from "react";
import { ProjectDTO } from "@interfaces/projectInterface";
import { useConfirmationModal, useDetailModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";
import { useAuth } from "@stores/authStore";

const useProjectController = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);
  const showConfirmationModal = useConfirmationModal((state) => state.showModal);
  const nav = useNavigate();
  const token = useAuth.getState().token; 
  const useGetProjectsService = () => {
    const [finalData, setFinalData] = useState<FetchDataType[][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch("http://127.0.0.1:8000/api/v1/projects", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // add token if needed
            },
          });

          if (!res.ok) throw new Error("Failed to fetch projects");

          const json = await res.json();
          const projects: ProjectDTO[] = json.data || [];

          const mappedData: FetchDataType[][] = [
            projects.map((item) => ({
              id: item.id,
              row: [
                { type: "text", value: item.name },
                { type: "text", value: item.description },
                { type: "text", value: item.address_detail },
                {
                  type:
                    item.status === 1
                      ? "pending"
                      : item.status === 2
                      ? "failed"
                      : "success",
                  value:
                    item.status === 1
                      ? "Pending"
                      : item.status === 2
                      ? "Rejected"
                      : "Accepted",
                },
              ],
              functions: [
                {
                  type: "detail",
                  onClick: () => {
                    showDetailModal({
                      title: "Project Detail",
                      data: [
                  { type: "text", label: "Title", value: item.name },
                  { type: "textarea", label: "Description", value: item.description },
                  { type: "text", label: "Address", value: item.address_detail },
                  { type: "text", label: "Status", value: item.address_detail },
                ],
                    });
                  },
                },
                {
                  type: "edit",
                  onClick: () => {
                    const defaultValues = {
                      name: item.name,
                      description: item.description,
                      address_detail: item.address_detail,
                      status: {
                        id: Number(item.status),
                        label:
                          Number(item.status) === 1
                            ? "Pending"
                            : Number(item.status) === 2
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
                    showConfirmationModal({
                      title: "Delete Project",
                      subTitle: `Are you sure you want to delete |"${item.name}"| project? This action cannot be undone!`,
                    });
                  },
                },
              ],
            })),
          ];

          setFinalData(mappedData);
        } catch (err: any) {
          setError(err.message || "Unknown error");
          setFinalData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }, []);

    return { finalData, loading, error };
  };

  return { useGetProjectsService };
};

export default useProjectController;
