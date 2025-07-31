export interface DefectTypeInput {
  name: string;
}

export interface DefectTypeDTO extends DefectTypeInput {
  id: number;
  created_at: string;
}
