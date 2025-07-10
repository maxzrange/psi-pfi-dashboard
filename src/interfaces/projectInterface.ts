import { ComboBoxOption } from "@aws-amplify/ui-react";
import { MapType } from "types/formType";

export interface ProjectInput {
  title: string;
  description: string;
  location: MapType | null;
  customer: ComboBoxOption | null;
}
