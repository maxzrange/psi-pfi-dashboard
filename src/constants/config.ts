import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
} from "react-icons/md";
import { BaseConfigType, SidebarType } from "types/configType";

// Base config
export const baseConfig: BaseConfigType = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: "MaxZRange",
  footer: true,
};

// Navigation sidebar
export const appNavs: SidebarType[] = [
  {
    eventKey: "dashboard",
    icon: MdDashboard,
    title: "Dashboard",
    to: "/",
  },
  {
    eventKey: "projects",
    icon: MdOutlineTableChart,
    title: "Project",
    to: "/project",
    children: [
      {
        eventKey: "project-list",
        title: "Project List",
        to: "",
      },
      {
        eventKey: "users",
        title: "Project Status",
        to: "/users-table",
      },
    ],
  },
  {
    eventKey: "buildings",
    icon: MdOutlineTableChart,
    title: "Building",
    to: "/building",
    children: [
      {
        eventKey: "building-list",
        title: "Building List",
        to: "",
      },
      {
        eventKey: "users",
        title: "Building Type",
        to: "/users-table",
      },
    ],
  },
  {
    eventKey: "forms",
    icon: MdModeEditOutline,
    title: "Annotation",
    to: "/forms",
    children: [
      {
        eventKey: "form-basic",
        title: "Annotation",
        to: "/forms",
      },
      {
        eventKey: "form-wizard",
        title: "Report",
        to: "/edit-form",
      },
    ],
  },
  {
    eventKey: "profile",
    icon: MdAccountBox,
    title: "Profile",
    to: "/profile",
  },
];
