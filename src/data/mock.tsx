import { faker } from "@faker-js/faker/locale/en";
import { BuildingDTO } from "@interfaces/buildingInterface";
import { DefectDTO } from "@interfaces/defectInterface";
import { ProjectDTO } from "@interfaces/projectInterface";
import moment from "moment";

export const mockProjectsData = (length: number): ProjectDTO[] => {
  const createRowData = () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.catchPhrase(),
      description: faker.lorem.words(20),
      latitude: faker.location.latitude().toString(),
      longtitude: faker.location.longitude().toString(),
      status: faker.helpers.arrayElement([1, 2, 3]),
      customer_id: faker.string.uuid(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
      created_by: faker.person.fullName(),
    } as ProjectDTO;
  };

  return Array.from({ length }).map(() => createRowData()) as ProjectDTO[];
};

export const mockBuildingData = (length: number): BuildingDTO[] => {
  const createRowData = () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingDTO;
  };

  return Array.from({ length }).map(() => createRowData()) as BuildingDTO[];
};

export const mockDefectData = (length: number): DefectDTO[] => {
  const createRowData = () =>
    ({
      id: faker.string.uuid(),
      name: faker.word.adjective(),
      defect_type_id: faker.string.uuid(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as DefectDTO);

  return Array.from({ length }).map(() => createRowData()) as DefectDTO[];
};
