import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import "@tanstack/react-query";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import { IconsProvider, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";

import Layout from "@components/Layout";
import Dashboard from "@pages/dashboard";
import Profile from "@pages/profile";
import { AddProject, Project } from "@pages/project";
import { AddBuilding, Building } from "@pages/building";
import { ErrResType } from "types/resType";
import { BsThreeDots } from "react-icons/bs";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ErrResType;
  }
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <IconsProvider
        icons={{
          menu: {
            menu: <BsThreeDots />,
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="project/*" element={<ProjectRoute />} />
            <Route path="building/*" element={<BuildingRoute />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </IconsProvider>
    </ThemeProvider>
  );
}

function BuildingRoute() {
  return (
    <Routes>
      <Route index element={<Building />} />
      <Route path="form" element={<AddBuilding />} />
      {/* <Route path="users-table" element={<UsersTable />} /> */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function ProjectRoute() {
  return (
    <Routes>
      <Route index element={<Project />} />
      <Route path="form" element={<AddProject />} />
      {/* <Route path="users-table" element={<UsersTable />} /> */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
