import useHelper from "@hooks/useHelper";
import { ProjectInput } from "@interfaces/projectInterface";
import {
  addProject,
  deleteProject,
  getProjects,
} from "@services/projectService";
import { useDetailModal } from "@stores/modalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/configs/client";

const useProjectModel = () => {
  const detailModal = useDetailModal();

  const { auth, nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetProjects = () =>
    useQuery({
      queryKey: ["getProjects"],
      queryFn: () => getProjects(),
    });

  const useAddProject = () =>
    useMutation({
      mutationKey: ["addProject"],
      mutationFn: (body: ProjectInput) =>
        addProject(body, auth.userId, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        onSuccess(res.message);
        queryClient.refetchQueries({ queryKey: ["getProjects"], type: "all" });
        nav("/project");
      },
    });

  const useDeleteProject = () =>
    useMutation({
      mutationKey: ["deleteProject"],
      mutationFn: (name: string) => deleteProject(name, auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => {
        onError(error);
        detailModal.hideModal();
      },
      onSuccess: (res) => {
        onSuccess(res.message);
        queryClient.refetchQueries({ queryKey: ["getProjects"], type: "all" });
        detailModal.hideModal();
      },
    });

  return {
    useGetProjects,
    useAddProject,
    useDeleteProject,
  };
};

export default useProjectModel;
