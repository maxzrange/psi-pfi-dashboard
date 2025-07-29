export interface BuildingTypeInput {
  name: string;
  description: string;
}

export interface BuildingTypeDTO extends BuildingTypeInput {
  id: number;
  created_at: string;
}
