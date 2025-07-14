import { MapType } from "types/formType";

export interface BuildingInput {
  name: string;
  location: MapType | null;
}

export interface BuildingDTO {
  id: string;
  name: string;
  created_at: string;
}
