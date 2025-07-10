import { To } from "react-router-dom";

export type TableType = {
  title: string;
  subTitle: string;
  addDest?: To;
  tableHeaders: string[];
};
