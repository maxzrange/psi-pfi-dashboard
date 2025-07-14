import { faker } from "@faker-js/faker/locale/en";
import { BuildingDTO } from "@interfaces/buildingInterface";
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

  return Array.from({ length }).map(() => {
    return createRowData();
  }) as ProjectDTO[];
};

export const mockBuildingData = (length: number): BuildingDTO[] => {
  const createRowData = () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      created_at: moment(faker.date.past()).format("MM-DD-YYYY"),
    } as BuildingDTO;
  };

  return Array.from({ length }).map(() => {
    return createRowData();
  }) as BuildingDTO[];
};
