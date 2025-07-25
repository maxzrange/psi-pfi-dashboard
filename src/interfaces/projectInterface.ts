export interface ProjectInput {
  name: string;
  description: string;
  status: string;
}

export interface ProjectDTO extends Omit<ProjectInput, "status"> {
  id: string;
  status: number;
  created_at: string;
  created_by: string;
}
