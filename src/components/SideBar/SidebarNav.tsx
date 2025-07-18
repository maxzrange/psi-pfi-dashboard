import "./SideBar.css";
import { NavLink, useLocation } from "react-router-dom";
import { appNavs } from "@utils/constants/config";

const SideBarNav = () => {
  const location = useLocation();

  return (
    <div className="sidebar-nav">
      <ul>
        {appNavs.map((item) => {
          const { children, ...rest } = item;

          if (rest.target === "_blank") return <></>;

          const Icon = item.icon;

          return (
            <li key={item.eventKey}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <Icon viewBox="12" />

                {item.title}
              </NavLink>

              {children && (
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.eventKey}>
                        <NavLink
                          to={item.to + child.to}
                          style={{
                            color:
                              location.pathname === `${item.to}${child.to}`
                                ? "var(--amplify-components-link-color)"
                                : "var(--amplify-components-text-color)",
                          }}
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
