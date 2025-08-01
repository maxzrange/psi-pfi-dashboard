import { ComboBoxOption } from "@aws-amplify/ui-react";
import { RegisterOptions } from "react-hook-form";

export type MapType = {
  lat: number;
  lng: number;
  area: string;
  description: string;
};

export type ImageType = {
  name: string;
  preview: string;
};

export type CartType = {
  background?: string;
  title: string;
  defaultValues: any;
  inputs: InputType[];
};

export type TabType = CartType & {
  title: string;
  name: string;
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
    | "tab"
    | "cart"
    | "range"
    | "gallery";
  name: string;
  label: string;
  required: boolean;
  items?: ComboBoxOption[];
  rules?: RegisterOptions<any, string>;
  tabData?: TabType[];
  cartData?: CartType;
  rangeData?: [InputType, InputType];
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
