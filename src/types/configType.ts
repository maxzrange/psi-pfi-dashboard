import { IconType } from "react-icons";

export type BaseConfigType = {
  projectLink: string;
  docsRepositoryBase: string;
  titleSuffix: string;
  search: boolean;
  header?: string;
  footer: boolean;
};

export type SidebarChildType = {
  eventKey: string;
  title: string;
  to: string;
};

export type SidebarType = SidebarChildType & {
  icon: IconType;
  children?: SidebarChildType[];
  target?: string;
};
