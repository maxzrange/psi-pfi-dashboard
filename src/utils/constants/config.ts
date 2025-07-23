import {
  MdDashboard,
  MdOutlineTableChart,
  MdContentPasteSearch,
} from "react-icons/md";
import { HiOutlineAnnotation, HiOutlineOfficeBuilding } from "react-icons/hi";
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
  },
  {
    eventKey: "buildings",
    icon: HiOutlineOfficeBuilding,
    title: "Building",
    to: "/building",
  },
  {
    eventKey: "defects",
    icon: MdContentPasteSearch,
    title: "Defect",
    to: "/defect",
  },
  {
    eventKey: "forms",
    icon: HiOutlineAnnotation,
    title: "Annotation",
    to: "/forms",
  },
];
