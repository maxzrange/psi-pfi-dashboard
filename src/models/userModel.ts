import { getUserProfile } from "@services/userService";
import { useAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

const useUserModel = () => {
  const username = useAuth((state) => state.username);

  const useGetUserProfile = () =>
    useQuery({
      queryKey: ["getUserProfile"],
      queryFn: () => getUserProfile(username),
      retry: false,
      refetchOnWindowFocus: false,
    });

  return {
    useGetUserProfile,
  };
};

export default useUserModel;
