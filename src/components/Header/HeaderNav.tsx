import { Menu, MenuItem, MenuButton, Link } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { baseConfig } from "@utils/constants/config";
import { useAuth } from "@stores/authStore";
import { useConfirmationModal } from "@stores/modalStore";
import { toast } from "react-toastify";

const HeaderNav = () => {
  const resetAuth = useAuth((state) => state.resetToken);
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const navigate = useNavigate();

  return (
    <>
      {baseConfig.projectLink && (
        <div className="github-link">
          <Link
            href={baseConfig.projectLink}
            isExternal={true}
            ariaLabel="github"
          >
            <AiFillGithub />
          </Link>
        </div>
      )}

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <img alt="avatar" src={"https://i.pravatar.cc/150?img=3"}></img>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem
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
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderNav;
