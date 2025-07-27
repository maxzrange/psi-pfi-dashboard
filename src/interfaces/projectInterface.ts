import { DropdownType } from "types/formType";

export interface ProjectInput {
  name: string;
  description: string;
  address_detail: string | null;
  status: DropdownType | null;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  address_detail: string;
  status?: number;
  created_at: string;
  created_by: string;
}
