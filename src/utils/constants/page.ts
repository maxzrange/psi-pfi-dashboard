import { TableType } from "types/pageType";

// Building table
export const buildingData: TableType = {
  title: "Building",
  subTitle: "Building List",
  addLabel: "Building",
  addDest: "/building/form",
  tableHeaders: ["Name", "Created At"],
};

// Building type table
export const buildingTypeData: TableType = {
  title: "Building",
  subTitle: "Building Type List",
  addLabel: "Building Type",
  addDest: "/building/type-form",
  tableHeaders: ["Name", "Created At"],
};

// Project table
export const projectData: TableType = {
  title: "Project",
  subTitle: "Project List",
  addLabel: "Project",
  addDest: "/project/form",
  tableHeaders: ["Title", "Description", "Status"],
};

// Defect table
export const defectData: TableType = {
  title: "Defect",
  subTitle: "Defect List",
  addLabel: "Defect",
  addDest: "/defect/form",
  tableHeaders: ["Name", "Created At"],
};

// Defect type table
export const defectTypeData: TableType = {
  title: "Defect",
  subTitle: "Defect Type List",
  addLabel: "Defect Type",
  addDest: "/defect/type-form",
  tableHeaders: ["Name", "Created At"],
};
