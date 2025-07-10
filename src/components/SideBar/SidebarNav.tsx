import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@aws-amplify/ui-react";
import { appNavs } from "@utils/constants/config";

const SideBarNav = () => {
  let activeClassName = "active";

  return (
    <div className="sidebar-nav">
      <ul>
        {appNavs.map((item) => {
          const { children, ...rest } = item;

          if (rest.target === "_blank") return <></>;

          return (
            <li key={item.eventKey}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                <Icon as={item.icon} />

                {item.title}
              </NavLink>

              {children && (
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.eventKey}>
                        <NavLink
                          to={item.to + child.to}
                          className={({ isActive }) =>
                            isActive ? activeClassName : undefined
                          }
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarNav;
