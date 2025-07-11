import { useOneAuth } from "@stores/authStore";
import { useLoading } from "@stores/pageStore";

const useHelper = () => {
  const loading = useLoading();
  const oneToken = useOneAuth((state) => state.token);

  const onMutate = () => loading.showLoading();

  const onSettled = () => loading.hideLoading();

  return {
    oneToken,
    onMutate,
    onSettled,
  };
};

export default useHelper;
