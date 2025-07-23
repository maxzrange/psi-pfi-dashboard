import { ComboBoxOption } from "@aws-amplify/ui-react";
import useOneMapModel from "@models/oneMapModel";

const useOneMapController = () => {
  const { useLoginOneMap, useSearchAddress, useRetrieveTheme } =
    useOneMapModel();

  const loginOneMapMutation = useLoginOneMap();

  const useSearchAddressService = () => {
    const { data, isLoading } = useSearchAddress();

    let finalData: (ComboBoxOption & { description: string })[] = [];

    if (!isLoading && data) {
      finalData = data.results.map(
        (item) =>
          ({
            id: `${item.LATITUDE}|${item.LONGITUDE}`,
            label: item.BUILDING,
            description: item.ADDRESS,
          } as ComboBoxOption & { description: string })
      );
    }

    return {
      finalData,
      isLoading,
    };
  };

  const useRetrieveThemeService = () => {
    const { data, isLoading } = useRetrieveTheme();

    let finalData: any[] = [];

    if (!isLoading && data) {
      finalData = data.map((item) => ({
        noColor: item.noColor,
        data: {
          type: "FeatureCollection",
          features: item.data
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
        },
      }));
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
