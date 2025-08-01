import { ComboBoxOption } from "@aws-amplify/ui-react";
import useHelper from "@hooks/useHelper";
import useBuildingLevelModel from "@models/buildingLevelModel";

const useBuildingLevelController = () => {
  const { onError } = useHelper();

  const { useGetBuildingLevelDropdown } = useBuildingLevelModel();

  const useGetBuildingLevelDropdownService = () => {
    const { data, isLoading, isError, error } = useGetBuildingLevelDropdown();

    let finalData: ComboBoxOption[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = data.data.data.map((item) => ({
          id: item.id.toString(),
          label: item.level_name,
        }));
      }
    }

    return {
      finalData,
    };
  };

  return {
    useGetBuildingLevelDropdownService,
  };
};

export default useBuildingLevelController;
