import { To } from "react-router-dom";
import { MapType } from "./formType";

export type TableType = {
  title: string;
  addDest?: To;
  tableHeaders: string[];
};

export type RowType = {
  type: "text" | "success" | "pending" | "failed";
  value: string | number;
};

export type RowFuncType = {
  type: "edit" | "detail" | "delete";
  onClick: () => void;
};

export type FetchDataType = {
  id: string;
  row: RowType[];
  functions: RowFuncType[];
};

export type DetailItemType = {
  type: "text" | "textarea" | "map";
  label: string;
  value: string | MapType;
};

export type DetailType = {
  title: string;
  data: DetailItemType[];
};

export type ConfirmationType = {
  title: string;
  subTitle: string;
  onConfirm?: () => void;
};

export type ProfileType = {
  name: string;
  role: string;
  profilePic: string;
};
