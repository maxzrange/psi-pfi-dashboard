export interface BuildingLevelInput {
  level_name: string;
  description: string;
  primary_usage: string;
  building_id?: number;
}

export interface BuildingLevelDTO extends BuildingLevelInput {
  id: number;
}
