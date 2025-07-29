import useUserModel from "@models/userModel";
import { ProfileType } from "types/pageType";

const useUserController = () => {
  const { useGetUserProfile } = useUserModel();

  const useGetUserProfileService = () => {
    const { data, isLoading } = useGetUserProfile();

    let finalData: ProfileType & { id: number | null } = {
      id: null,
      name: "John Doe",
      role: "Employee",
      profilePic: "https://i.pravatar.cc/150?img=3",
    };

    if (!isLoading && data) {
      finalData = {
        ...finalData,
        id: data.data.id,
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
