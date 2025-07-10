import { Routes, Route, Link, Navigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";

import Layout from "@components/Layout";
import Dashboard from "@pages/dashboard";
import Forms from "@pages/forms";
import EditForm from "@pages/forms/EditForm";
import Profile from "@pages/profile";
import UsersTable from "@pages/tables/UsersTable";
import { AddProject, Project } from "@pages/project";
import { AddBuilding, Building } from "@pages/building";

import "@tanstack/react-query";
import { ErrResType } from "types/resType";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ErrResType;
  }
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="forms" element={<Forms />} />
            <Route path="edit-form" element={<EditForm />} />
            <Route path="project/*" element={<ProjectRoute />} />
            <Route path="building/*" element={<BuildingRoute />} />
            <Route path="profile" element={<Profile />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function BuildingRoute() {
  return (
    <Routes>
      <Route index element={<Building />} />
      <Route path="add" element={<AddBuilding />} />
      <Route path="users-table" element={<UsersTable />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function ProjectRoute() {
  return (
    <Routes>
      <Route index element={<Project />} />
      <Route path="add" element={<AddProject />} />
      <Route path="users-table" element={<UsersTable />} />
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
