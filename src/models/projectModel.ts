import useHelper from "@hooks/useHelper";
import { ProjectInput } from "@interfaces/projectInterface";
import {
  addProject,
  deleteProject,
  getProjectDetail,
  getProjects,
  updateProject,
} from "@services/projectService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";

const useProjectModel = () => {
  const detailModal = useDetailModal();

  const queryClient = useQueryClient();

  const { auth, nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetProjects = () =>
    useQuery({
      queryKey: ["getProjects"],
      queryFn: () => getProjects(),
    });

  const useGetProjectEdit = () =>
    useMutation({
      mutationKey: ["getProjectEdit"],
      mutationFn: (name: string) => getProjectDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: ProjectInput = {
          name: res.data.name,
          description: res.data.description,
          address_detail: res.data.address_detail,
          status: [
            { label: "", id: "" },
            { label: "Pending", id: "1" },
            { label: "Rejected", id: "2" },
            { label: "Accepted", id: "3" },
          ]
            .find((item) => item.id === res.data.status.toString())!
            .id.toString(),
        };

        nav(
          `/project/form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useAddProject = () =>
    useMutation({
      mutationKey: ["addProject"],
      mutationFn: (body: ProjectInput) => addProject(body, auth.userId),
      onMutate: () => onMutate("button"),
      onError,
      onSuccess: (res) => {
        queryClient.refetchQueries({
          queryKey: ["getProjects"],
        });
        nav("/project");
        onSuccess(res.message);
      },
      onSettled: () => onSettled("button"),
    });

  const useUpdateProject = () =>
    useMutation({
      mutationKey: ["updatedProject"],
      mutationFn: (data: { name: string; body: ProjectInput }) =>
        updateProject(data.name, data.body),
      onMutate: () => onMutate("button"),
      onError,
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        nav("/project");
        onSuccess(res.message);
      },
      onSettled: () => onSettled("button"),
    });

  const useDeleteProject = () =>
    useMutation({
      mutationKey: ["deleteProject"],
      mutationFn: (name: string) => deleteProject(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => {
        onError(error);
        detailModal.hideModal();
      },
      onSuccess: async (res) => {
        detailModal.hideModal();
        onSuccess(res.message);
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      },
    });

  return {
    useGetProjects,
    useGetProjectEdit,
    useAddProject,
    useUpdateProject,
    useDeleteProject,
  };
};

export default useProjectModel;
