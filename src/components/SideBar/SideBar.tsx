import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SideBar.css";
import SideBarNav from "./SidebarNav";
import SidebarNavToggle from "./SidebarNavToggle";
import { Flex } from "@aws-amplify/ui-react";

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
        <SideBarNav />
      </Flex>
    </>
  );
};

export default SideBar;
