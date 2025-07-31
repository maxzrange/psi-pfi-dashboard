import { ComboBoxOption } from "@aws-amplify/ui-react";

export interface DefectInput {
  name: string;
  defect_type_id: ComboBoxOption | null;
}

export interface DefectDTO extends Omit<DefectInput, "defect_type_id"> {
  id: number;
  defect_type_id: number;
  created_at: string;
}
