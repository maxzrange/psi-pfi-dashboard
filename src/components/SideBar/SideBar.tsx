import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";
import SideBarNav from "./SidebarNav";
import SidebarNavToggle from "./SidebarNavToggle";
import { Flex } from "@aws-amplify/ui-react";
import Logo from "@components/Logo";
import SidebarProfile from "./SidebarProfile";

const SideBar = () => {
  const [expand, setExpand] = useState(false);

  let location = useLocation();

  useEffect(() => {
    setExpand(false);
  }, [location]);

  return (
    <>
      <div className="btn-sidebar-nav">
        <SidebarNavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </div>

      <Flex direction="column" className={`sidebar ${expand && "visible"}`}>
        <Link to="/" className="logo">
          <Logo />

          <h1>MaxZRange</h1>
        </Link>

        <SideBarNav />

        <SidebarProfile />
      </Flex>
    </>
  );
};

export default SideBar;
