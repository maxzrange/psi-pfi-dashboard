import { ComboBoxOption } from "@aws-amplify/ui-react";

export interface BuildingSideInput {
  name: string;
  building_id: ComboBoxOption | null;
  description: string;
  orientation_degrees: number;
}

export interface BuildingSideDTO {
  id: number;
  name: string;
  building_id: number;
  description: string | null;
  orientation_degrees: number;
  created_at: string;
}
