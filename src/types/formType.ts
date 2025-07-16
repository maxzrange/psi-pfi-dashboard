import { ComboBoxOption } from "@aws-amplify/ui-react";
import { RegisterOptions } from "react-hook-form";

export type MapType = {
  lat: number;
  lng: number;
};

export type DropdownType = {
  label: string;
  id: string | number;
};

export type InputType = {
  type:
    | "text"
    | "textarea"
    | "dropdown"
    | "map"
    | "auto"
    | "password"
    | "confirm";
  name: string;
  label: string;
  required: boolean;
  items?: ComboBoxOption[];
  rules?: RegisterOptions<any, string>;
};

export type FormType<T> = {
  title: string;
  subTitle?: string;
  inputs: InputType[];
  defaultValues: T;
};

export type AuthFormType<T> = FormType<T> & {
  subTitle: string;
  buttonLabel: string;
};
