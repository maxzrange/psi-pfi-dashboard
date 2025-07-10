import useHelper from "@hooks/useHelper";
import { getDroneQuery, loginOneMap } from "@services/oneMapService";
import { useOneAuth } from "@stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { MapType } from "types/formType";

const useOneMapModel = () => {
  const setOneToken = useOneAuth((state) => state.setToken);

  const { oneToken, onMutate, onSettled } = useHelper();

  const useLoginOneMap = () =>
    useMutation({
      mutationKey: ["loginOneMap"],
      mutationFn: () => loginOneMap(),
      onMutate,
      onSettled,
      onSuccess: (response) => {
        localStorage.setItem("@one-token", response.access_token);
        setOneToken(response.access_token);
      },
    });

  const useGetDroneQuery = () =>
    useMutation({
      mutationKey: ["getDroneQuery"],
      mutationFn: (body: MapType) => getDroneQuery(body, oneToken),
      onMutate,
      onSettled,
      onSuccess: (response) => console.log(response),
      onError: async (error) => {
        if (error.status === 403) {
          const response = await loginOneMap();
          localStorage.setItem("@one-token", response.access_token);
          setOneToken(response.access_token);
        }
      },
    });

  return {
    useLoginOneMap,
    useGetDroneQuery,
  };
};

export default useOneMapModel;
