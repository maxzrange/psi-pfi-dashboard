export interface ProjectInput {
  name: string;
  description: string;
  address_detail?: string;
  status: string;
}

export interface ProjectDTO extends Omit<ProjectInput, "status"> {
  id: number;
  status: number;
  created_at: string;
  created_by: string;
}
