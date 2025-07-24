import useUserModel from "@models/userModel";
import { ProfileType } from "types/pageType";

const useUserController = () => {
  const { useGetUserProfile } = useUserModel();

  const useGetUserProfileService = () => {
    const { data, isLoading } = useGetUserProfile();

    let finalData: ProfileType = {
      name: "",
      role: "",
      profilePic: "https://i.pravatar.cc/150?img=3",
    };

    if (!isLoading && data) {
      finalData = {
        ...finalData,
        name: data.data.name,
        role: data.data.username,
      };
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetUserProfileService,
  };
};

export default useUserController;
