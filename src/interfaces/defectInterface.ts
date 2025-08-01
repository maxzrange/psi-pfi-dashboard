import { ComboBoxOption } from "@aws-amplify/ui-react";
import { ImageType } from "types/formType";

export interface DefectInput {
  name: string;
  defect_type_id: ComboBoxOption | null;
}

export interface DefectLevelInput {
  level_from_id: ComboBoxOption | null;
  level_to_id?: ComboBoxOption | null;
  images: ImageType[];
}

export interface DefectReportInput {
  side_id: ComboBoxOption | null;
  side_image: ImageType[];
  levels: DefectLevelInput[];
}

export interface DefectPicIput {
  building_id: ComboBoxOption | null;
  reports: DefectReportInput[];
}

export interface DefectDTO extends Omit<DefectInput, "defect_type_id"> {
  id: number;
  defect_type_id: number;
  created_at: string;
}
