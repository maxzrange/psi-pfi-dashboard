import { TableType } from "types/pageType";

// Building table
export const buildingData: TableType[] = [
  {
    title: "Building",
    addDest: "/building/form",
    tableHeaders: [
      "Name",
      "Address",
      "Year Built",
      "Area (sq meter)",
      "Number of Levels",
      "Number of Sides",
      "Status Construction",
      "Start At",
      "End At",
      "Created At",
    ],
  },
  {
    title: "Building Type",
    addDest: "/building/type-form",
    tableHeaders: ["Name", "Description", "Created At"],
  },
  {
    title: "Building Elevation",
    addDest: "/building/side-form",
    tableHeaders: ["Name", "Building", "Orientation", "Created At"],
  },
];

// Project table
export const projectData: TableType[] = [
  {
    title: "Project",
    addDest: "/project/form",
    tableHeaders: ["Title", "Description", "Address", "Created At", "Status"],
  },
];

// Defect table
export const defectData: TableType[] = [
  {
    title: "Defect",
    addDest: "/defect/form",
    tableHeaders: ["Name", "Created At"],
  },
  {
    title: "Defect Type",
    addDest: "/defect/type-form",
    tableHeaders: ["Name", "Created AT"],
  },
];
