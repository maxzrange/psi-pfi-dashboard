import { ComboBoxOption } from "@aws-amplify/ui-react";
import useOneMapModel from "@models/oneMapModel";
import { queryClient } from "@utils/configs/client";

const useOneMapController = () => {
  const { useLoginOneMap, useSearchAddress } = useOneMapModel();

  const loginOneMapMutation = useLoginOneMap();

  const useSearchAddressService = () => {
    const { data, isLoading, isError, error } = useSearchAddress();

    let finalData: (ComboBoxOption & { description: string })[] = [];

    if (!isLoading) {
      if (isError) {
        if (error.status === 403) {
          loginOneMapMutation.mutate();
          queryClient.invalidateQueries({ queryKey: ["searchAddress"] });
        }
      } else {
        if (data) {
          finalData = data.results.map(
            (item) =>
              ({
                id: `${item.LATITUDE}|${item.LONGITUDE}`,
                label: item.BUILDING,
                description: item.ADDRESS,
              } as ComboBoxOption & { description: string })
          );
        }
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    loginOneMapService: () => loginOneMapMutation.mutate(),
    useSearchAddressService,
  };
};

export default useOneMapController;
