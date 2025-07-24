import { useAuth, useOneAuth } from "@stores/authStore";
import { useLoadingModal } from "@stores/modalStore";
import { useLoading } from "@stores/pageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHelper = () => {
  const loading = useLoading();
  const loadingModal = useLoadingModal();
  const oneToken = useOneAuth((state) => state.token);
  const auth = useAuth();

  const nav = useNavigate();

  const onMutate = (type: "modal" | "button") => {
    if (type === "modal") {
      loadingModal.showLoading();
    } else if (type === "button") {
      loading.showLoading();
    }
  };

  const onSettled = (type: "modal" | "button") => {
    if (type === "modal") {
      loadingModal.showLoading();
    } else if (type === "button") {
      loading.hideLoading();
    }
  };

  const onSuccess = (message: string) => toast.success(message);

  const onError = (message: string) => toast.error(message);

  return {
    oneToken,
    auth,
    nav,
    onMutate,
    onSettled,
    onSuccess,
    onError,
  };
};

export default useHelper;
