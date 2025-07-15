import Layout from "@components/Layout";
import { AddBuilding, Building } from "@pages/building";
import Dashboard from "@pages/dashboard";
import Profile from "@pages/profile";
import { AddProject, Project } from "@pages/project";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="project/*" element={<ProjectRoute />} />
        <Route path="building/*" element={<BuildingRoute />} />
        <Route path="profile" element={<Profile />} />
        <Route path="not-found" element={<NoMatch />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;

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
