import { To } from "react-router-dom";
import { MapType } from "./formType";
import { IconType } from "react-icons";

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
  type: "edit" | "detail" | "delete" | "custom";
  icon?: IconType;
  label?: string;
  onClick: () => void;
};

export type FetchDataType = {
  id: number;
  row: RowType[];
  functions: RowFuncType[];
};

export type DetailItemType = {
  type: "text" | "textarea" | "map" | "accordion";
  label: string;
  value: string | MapType | Partial<DetailItemType>[];
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
