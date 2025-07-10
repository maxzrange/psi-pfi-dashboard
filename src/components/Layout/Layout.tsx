import { Outlet } from "react-router-dom";
import "./Layout.css";
import { ReactNode } from "react";
import { baseConfig } from "@constants/config";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import Footer from "@components/Footer";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = () => {
  return (
    <div className="layout-container">
      {baseConfig.header && <Header />}

      <SideBar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <div className="page-container">
        <Outlet />
      </div>

      {baseConfig.footer && <Footer />}
    </div>
  );
};

export default Layout;
