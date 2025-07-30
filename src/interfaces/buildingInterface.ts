import { MapType } from "types/formType";
import { ProjectDTO } from "./projectInterface";
import { ComboBoxOption } from "@aws-amplify/ui-react";
import { BuildingSideInput } from "./buildingSideInterface";
import { BuildingLevelInput } from "./buildingLevelInterface";

export interface BuildingInput {
  name: string;
  address: string;
  year_built: string;
  building_type: ComboBoxOption | null;
  area_sq_meters: number;
  levels_count: number;
  sides_count: number;
  owner: string;
  project_id: ComboBoxOption | null;
  location: MapType | null;
  status_construction: number;
  construction_start_date: string | null;
  construction_end_date: string | null;
  buildingData: [BuildingSideInput[], BuildingLevelInput[]];
}

export interface BuildingDTO {
  id: number;
  name: string;
  address: string;
  year_built: number;
  building_type: number;
  area_sq_meters: number;
  levels_count: number;
  sides_count: number;
  owner_id: number;
  project_id: number;
  latitude: number;
  longitude: number;
  status_construction: number;
  construction_start_date: string;
  construction_end_date: string;
  created_at: string;
  updated_at: string | null;
  is_deleted: boolean;
  deleted_at: string | null;
  project: ProjectDTO | null;
}
