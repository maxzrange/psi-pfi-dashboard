export interface BuildingSideInput {
  name: string;
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
