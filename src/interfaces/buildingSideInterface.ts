import { DropdownType } from "types/formType";

export interface BuildingSideInput {
  name: string;
  building_id: DropdownType | null;
}

export interface BuildingSideDTO {
  id: number;
  name: string;
  building_id: number;
  created_at: string;
}
