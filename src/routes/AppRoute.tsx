import Layout from "@components/Layout";
import {
  AddBuilding,
  AddBuildingLevel,
  AddBuildingSide,
  AddBuildingType,
  Building,
} from "@pages/building";
import Dashboard from "@pages/dashboard";
import { AddDefect, AddDefectType, Defect } from "@pages/master";
import Profile from "@pages/profile";
import { AddProject, Project } from "@pages/project";
import { Link, Navigate, Route, Routes } from "react-router-dom";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="project/*" element={<ProjectRoute />} />
        <Route path="building/*" element={<BuildingRoute />} />
        <Route path="defect/*" element={<DefectRoute />} />
        <Route path="profile" element={<Profile />} />
        <Route path="not-found" element={<NoMatch />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

function ProjectRoute() {
  return (
    <Routes>
      <Route index element={<Project />} />
      <Route path="form" element={<AddProject />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function BuildingRoute() {
  return (
    <Routes>
      <Route index element={<Building />} />
      <Route path="form" element={<AddBuilding />} />
      <Route path="type-form" element={<AddBuildingType />} />
      <Route path="side-form" element={<AddBuildingSide />} />
      <Route path="level-form" element={<AddBuildingLevel />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function DefectRoute() {
  return (
    <Routes>
      <Route index element={<Defect />} />
      <Route path="form" element={<AddDefect />} />
      <Route path="/type-form" element={<AddDefectType />} />
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
