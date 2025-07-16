import { ComboBoxOption } from "@aws-amplify/ui-react";
import useOneMapModel from "@models/oneMapModel";
import { queryClient } from "@utils/configs/client";
// import { toast } from "react-toastify";

const useOneMapController = () => {
  const { useLoginOneMap, useSearchAddress, useRetrieveTheme } =
    useOneMapModel();

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

  const useRetrieveThemeService = (params: string[]) => {
    const { data, isLoading } = useRetrieveTheme(params);

    let finalData: any[] = [];

    if (!isLoading) {
      if (data) {
        finalData = data.map((item) => ({
          type: "FeatureCollection",
          features: item
            .filter((result) => result.GeoJSON && result.GeoJSON.geometry)
            .map((item) => ({
              type: "Feature",
              geometry: item.GeoJSON.geometry,
              properties: {
                name: item.NAME,
                description: item.DESCRIPTION,
                type: item.Type,
              },
            })),
        }));
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
    useRetrieveThemeService,
  };
};

export default useOneMapController;
