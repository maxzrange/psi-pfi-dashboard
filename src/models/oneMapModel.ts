import useHelper from "@hooks/useHelper";
import {
  loginOneMap,
  retrieveTheme,
  searchAddress,
} from "@services/oneMapService";
import { useOneAuth } from "@stores/authStore";
import { useSearch } from "@stores/pageStore";
import { useMutation, useQuery } from "@tanstack/react-query";

const useOneMapModel = () => {
  const setOneToken = useOneAuth((state) => state.setToken);
  const search = useSearch((state) => state.value);

  const { onMutate, onSettled } = useHelper();

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

  const useSearchAddress = () =>
    useQuery({
      queryKey: ["searchAddress", search],
      queryFn: () => searchAddress(search),
    });

  const useRetrieveTheme = (params: string[]) =>
    useQuery({
      queryKey: ["retrieveTheme"],
      queryFn: () => retrieveTheme(params),
    });

  return {
    useLoginOneMap,
    useSearchAddress,
    useRetrieveTheme,
  };
};

export default useOneMapModel;
