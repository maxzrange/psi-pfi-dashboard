import { faker } from "@faker-js/faker/locale/en";
import {
  BuildingDTO,
  BuildingLevelDTO,
  BuildingSideDTO,
  BuildingTypeDTO,
} from "@interfaces/buildingInterface";
import { DefectDTO } from "@interfaces/defectInterface";
import { ProjectDTO } from "@interfaces/projectInterface";
import moment from "moment";

export const mockProjectsData = (length: number): ProjectDTO[] => {
  const createRowData = () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.catchPhrase(),
      description: faker.lorem.words(20),
      address_detail: faker.location.latitude().toString(),
      status: faker.helpers.arrayElement([1, 2, 3]),
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
      address: faker.location.streetAddress(),
      year_built: moment(faker.date.past()).format("YYYY"),
      building_type: faker.company.buzzNoun(),
      area: faker.number.float(),
      levels: faker.number.int(),
      elevation: faker.number.int(),
      facade: faker.word.noun(),
      location: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
        area: "-",
        description: "-",
      },
      cons_status: faker.number.int({ min: 0, max: 100 }),
      cons_start: moment(faker.date.past()).format("YYYY-MM-DD"),
      cons_end: moment(faker.date.future()).format("YYYY-MM-DD"),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingDTO;
  };

  return Array.from({ length }).map(() => createRowData()) as BuildingDTO[];
};

export const mockBuildingTypeData = (length: number) => {
  const createRowData = () =>
    ({
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.lorem.paragraph(1),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingTypeDTO);

  return Array.from({ length }).map(() => createRowData()) as BuildingTypeDTO[];
};

export const mockBuildingSideData = (length: number) => {
  const createRowData = () =>
    ({
      id: faker.string.uuid(),
      name: faker.company.name(),
      building: faker.company.name(),
      description: faker.lorem.paragraph(1),
      orientation: faker.number.float(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingSideDTO);

  return Array.from({ length }).map(() => createRowData()) as BuildingSideDTO[];
};

export const mockBuildingLevelData = (length: number) => {
  const createRowData = () =>
    ({
      id: faker.string.uuid(),
      building: faker.company.name(),
      level_num: faker.number.int(),
      description: faker.lorem.words(20),
      usage: faker.word.verb(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingLevelDTO);

  return Array.from({ length }).map(() =>
    createRowData()
  ) as BuildingLevelDTO[];
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
