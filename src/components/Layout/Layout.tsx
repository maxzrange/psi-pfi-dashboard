import "./Layout.css";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
// import Header from "@components/Header";
import SideBar from "@components/SideBar";
import Footer from "@components/Footer";
import { baseConfig } from "@utils/constants/config";
import {
  ConfirmationModal,
  DetailModal,
  DocumentModal,
} from "@components/Modal";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = () => {
  return (
    <div className="layout-container">
      <DetailModal />
      <ConfirmationModal />
      <DocumentModal />

      {/* {baseConfig.header && <Header />} */}

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
