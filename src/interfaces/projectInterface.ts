import { ComboBoxOption } from "@aws-amplify/ui-react";
import { DropdownType, MapType } from "types/formType";

export interface ProjectInput {
  name: string;
  description: string;
  location: MapType | null;
  customer: ComboBoxOption | null;
  status: DropdownType | null;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  latitude: string;
  longtitude: string;
  status?: number;
  customer_id: string;
  created_at: string;
  created_by: string;
}
