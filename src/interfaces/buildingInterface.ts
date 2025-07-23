import { DropdownType, MapType } from "types/formType";

export interface BuildingTypeInput {
  name: string;
  description: string;
}

export interface BuildingTypeDTO extends BuildingTypeInput {
  id: string;
  created_at: string;
}

export interface BuildingInput extends Omit<BuildingTypeInput, "description"> {
  address: string;
  year_built: string;
  building_type_id: DropdownType | null;
  area: number;
  levels: number;
  elevation: number;
  facade?: string;
  user_id?: DropdownType | null;
  location: MapType | null;
  cons_status: number;
  cons_start: string;
  cons_end: string;
}

export interface BuildingDTO extends Omit<BuildingInput, "building_type_id"> {
  id: string;
  building_type: string;
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
