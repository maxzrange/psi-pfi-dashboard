import { Button, Flex, Placeholder } from "@aws-amplify/ui-react";
import useAuthController from "@controllers/authController";
import useUserController from "@controllers/userController";
import { useAuth } from "@stores/authStore";
import { useConfirmationModal } from "@stores/modalStore";
import { useEffect } from "react";
import { IoLogOut } from "react-icons/io5";

const SidebarProfile = () => {
  const setUserId = useAuth((state) => state.setUserId);

  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const { logoutService } = useAuthController();
  const { useGetUserProfileService } = useUserController();

  const { finalData, isLoading } = useGetUserProfileService();

  useEffect(() => {
    if (finalData.id) {
      setUserId(finalData.id);
    }
  }, [finalData.id]);

  return (
    <Flex
      padding="12px 16px 12px 18px"
      alignItems="center"
      style={{ borderTop: "1px solid #E3E4E5" }}
      gap={12}
    >
      {isLoading ? (
        <>
          <Placeholder width={40} height={40} borderRadius="50%" />

          <Flex direction="column" flex={1} gap="1px">
            <Placeholder width="100%" height={17} />

            <Placeholder width="100%" height={14.5} />
          </Flex>

          <Placeholder width={32} height={32} />
        </>
      ) : (
        <>
          <img
            alt="avatar"
            src={finalData.profilePic}
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />

          <Flex direction="column" flex={1} gap="0">
            <p className="body-sm med">{finalData.name}</p>

            <p className="body-xs reg">{finalData.role}</p>
          </Flex>

          <Button
            alignItems="center"
            justifyContent="center"
            variation="menu"
            width={32}
            height={32}
            onClick={() =>
              showConfirmationModal({
                title: "Logout",
                subTitle: "Are you sure you want to logout?",
                onConfirm: logoutService,
              })
            }
          >
            <Flex>
              <IoLogOut size={18} />
            </Flex>
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SidebarProfile;
