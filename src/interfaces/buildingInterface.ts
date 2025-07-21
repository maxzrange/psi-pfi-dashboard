import { MapType } from "types/formType";

export interface BuildingInput {
  name: string;
  location: MapType | null;
}

export interface BuildingDTO {
  id: string;
  name: string;
  address: string;
  year_built: string;
  building_type: string;
  area: number;
  levels: number;
  elevation: number;
  created_at: string;
}

export interface BuildingTypeDTO {
  id: string;
  name: string;
  description: string;
  created_at: string;
}
