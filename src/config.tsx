import React from "react";
import { Icon } from "@aws-amplify/ui-react";

import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
} from "react-icons/md";

export const baseConfig = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "MaxZRange",
  footer: true,
  footerText: (
    <>
      <span>
        © MaxzRange {new Date().getFullYear()}, Made by {""}
        <a href="https://github.com/maxrange" target="_blank" rel="noreferrer">
          maxrange
        </a>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

/// Navigation sidebar
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={MdDashboard} />,
    title: "Dashboard",
    to: "/",
  },

  {
    eventKey: "projects",
    icon: <Icon as={MdOutlineTableChart} />,
    title: "Project",
    to: "/tables",
    children: [
      {
        eventKey: "project-list",
        title: "Project List",
        to: "/tables",
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
    icon: <Icon as={MdOutlineTableChart} />,
    title: "Building",
    to: "/project",
    children: [
      {
        eventKey: "project-list",
        title: "Building List",
        to: "/tables",
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
    icon: <Icon as={MdModeEditOutline} />,
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
    icon: <Icon as={MdAccountBox} />,
    title: "Profile",
    to: "/profile",
  },
];
