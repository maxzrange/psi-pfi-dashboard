import { DropdownType, MapType } from "types/formType";

export interface BuildingTypeInput {
  name: string;
  description?: string;
}

export interface BuildingTypeDTO extends BuildingTypeInput {
  id: string;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string;
}

export interface BuildingInput extends Omit<BuildingTypeInput, "description"> {
  address: string;
  year_built: string;
  building_type: DropdownType | null;
  area_sq_meters: number;
  levels_count: number;
  sides_count: number;
  owner_id: DropdownType | null;
  project_id: DropdownType | null;
  location: MapType | null;
  status_construction: number;
  construction_start_date: string;
  construction_end_date: string;
}

export interface BuildingDTO {
  id: string;
  name: string;
  address: string;
  year_built: string;
  building_type: string;
  area_sq_meters: number;
  levels_count: number;
  sides_count: number;
  owner_id: string;
  project_id: string;
  latitude: number;
  longitude: number;
  status_construction: number;
  construction_start_date: string;
  construction_end_date: string;
  created_at: string;
}

export interface BuildingSideInput extends BuildingTypeInput {
  building_id: DropdownType | null;
  orientation: number;
}

export interface BuildingSideDTO
  extends Omit<BuildingSideInput, "building_id"> {
  id: string;
  building: string;
  created_at: string;
}

export interface BuildingLevelInput
  extends Omit<Omit<BuildingSideInput, "name">, "orientation"> {
  level_num: number;
  usage: string;
}

export interface BuildingLevelDTO
  extends Omit<BuildingLevelInput, "building_id"> {
  id: string;
  building: string;
  created_at: string;
}
