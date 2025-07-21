import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { appNavs } from "@utils/constants/config";
import { Flex } from "@aws-amplify/ui-react";

const SideBarNav = () => {
  return (
    <Flex direction="column" flex={1} className="sidebar-nav">
      <ul>
        {appNavs.map((item) => {
          const { children, ...rest } = item;

          if (rest.target === "_blank") return <></>;

          const Icon = item.icon;

          return (
            <li key={item.eventKey}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${isActive ? "active" : undefined}`
                }
              >
                <Icon size={24} />

                <p className="body-md med">{item.title}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </Flex>
  );
};

export default SideBarNav;
