import { ComboBoxOption } from "@aws-amplify/ui-react";
import { RegisterOptions } from "react-hook-form";

export type MapType = {
  lat: number;
  lng: number;
  area: string;
  description: string;
};

export type TabType = {
  title: string;
  name: string;
  inputs: InputType[];
  defaultValues: any;
};

export type InputType = {
  type:
    | "text"
    | "textarea"
    | "dropdown"
    | "map"
    | "auto"
    | "password"
    | "confirm"
    | "phone"
    | "number"
    | "date"
    | "tab";
  name: string;
  label: string;
  required: boolean;
  items?: ComboBoxOption[];
  rules?: RegisterOptions<any, string>;
  tabData?: TabType[];
};

export type FormType<T> = {
  title: string;
  subTitle?: string;
  inputs: InputType[];
  defaultValues: T;
};

export type AuthFormType<T> = Omit<FormType<T>, "inputs"> & {
  subTitle: string;
  inputs: InputType[][];
  buttonLabel: string;
};
