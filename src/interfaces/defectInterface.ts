import { ComboBoxOption } from "@aws-amplify/ui-react";

export interface DefectInput {
  name: string;
  defectType: ComboBoxOption | null;
}

export interface DefectTypeDTO {
  id: string;
  name: string;
  created_at: string;
}

export interface DefectDTO extends DefectTypeDTO {
  defect_type_id: string;
}
