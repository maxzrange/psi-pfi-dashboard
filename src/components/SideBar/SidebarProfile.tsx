import { Button, Flex } from "@aws-amplify/ui-react";
import { useAuth } from "@stores/authStore";
import { useConfirmationModal } from "@stores/modalStore";
import { IoLogOut } from "react-icons/io5";
import { toast } from "react-toastify";

const SidebarProfile = () => {
  const resetAuth = useAuth((state) => state.resetToken);
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  return (
    <Flex
      padding="12px 16px 12px 18px"
      alignItems="center"
      style={{ borderTop: "1px solid #E3E4E5" }}
      gap={12}
    >
      <img
        alt="avatar"
        src={"https://i.pravatar.cc/150?img=3"}
        width={40}
        height={40}
        style={{ borderRadius: "50%" }}
      />

      <Flex direction="column" flex={1} gap="0">
        <p className="body-sm med">John Doe</p>

        <p className="body-xs reg">Employee</p>
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
            onConfirm: () => {
              localStorage.removeItem("@token");
              resetAuth();
              toast.success("Logout success!");
            },
          })
        }
      >
        <Flex>
          <IoLogOut size={18} />
        </Flex>
      </Button>
    </Flex>
  );
};

export default SidebarProfile;
