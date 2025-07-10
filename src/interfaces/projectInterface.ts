import { ComboBoxOption } from "@aws-amplify/ui-react";
import { MapType } from "types/formType";

export interface ProjectInput {
  title: string;
  description: string;
  location: MapType | null;
  customer: ComboBoxOption | null;
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
