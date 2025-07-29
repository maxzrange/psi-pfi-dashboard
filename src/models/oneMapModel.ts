import useHelper from "@hooks/useHelper";
import {
  loginOneMap,
  retrieveTheme,
  searchAddress,
} from "@services/oneMapService";
import { useOneAuth } from "@stores/authStore";
import { useOneTheme, useSearch } from "@stores/pageStore";
import { useMutation, useQuery } from "@tanstack/react-query";

const useOneMapModel = () => {
  const setOneToken = useOneAuth((state) => state.setToken);
  const search = useSearch((state) => state.value);
  const oneTheme = useOneTheme((state) => state.data);

  const { onMutate, onSettled } = useHelper();

  const useLoginOneMap = () =>
    useMutation({
      mutationKey: ["loginOneMap"],
      mutationFn: () => loginOneMap(),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
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

  const useRetrieveTheme = () =>
    useQuery({
      queryKey: ["retrieveTheme", oneTheme],
      queryFn: () =>
        retrieveTheme(
          oneTheme.filter((item) => item.active).map((item) => item.value)
        ),
    });

  return {
    useLoginOneMap,
    useSearchAddress,
    useRetrieveTheme,
  };
};

export default useOneMapModel;
