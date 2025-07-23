import { useAuth, useOneAuth } from "@stores/authStore";
import { useLoading } from "@stores/pageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHelper = () => {
  const loading = useLoading();
  const oneToken = useOneAuth((state) => state.token);
  const auth = useAuth();

  const nav = useNavigate();

  const onMutate = () => loading.showLoading();

  const onSettled = () => loading.hideLoading();

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
