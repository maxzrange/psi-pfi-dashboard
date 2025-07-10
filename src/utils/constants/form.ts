import { BuildingInput } from "src/interfaces/buildingInterface";
import { ProjectInput } from "src/interfaces/projectInterface";
import { FormType } from "types/formType";

export const projectForm: FormType<ProjectInput> = {
  title: "Add Project",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Title",
      required: true,
      rules: { required: "Title must be filled!" },
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      required: true,
      rules: { required: "Description must be filled!" },
    },
    {
      type: "map",
      name: "location",
      label: "Location",
      required: true,
      rules: {
        required: "Location must be choose!",
      },
    },
    {
      type: "auto",
      name: "customer",
      label: "Customer",
      required: true,
      items: [
        { id: "1", label: "Tio" },
        { id: "2", label: "Novriadi" },
        { id: "3", label: "Putra" },
      ],
      rules: {
        required: "Customer must be picked!",
      },
    },
  ],
  defaultValues: {
    title: "",
    description: "",
    location: null,
    customer: null,
  },
};

export const buildingForm: FormType<BuildingInput> = {
  title: "Add Building",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Name",
      required: true,
      rules: {
        required: "Building name must be filled!",
      },
    },
    {
      type: "map",
      name: "location",
      label: "Location",
      required: true,
      rules: {
        required: "Location must be choose!",
      },
    },
  ],
  defaultValues: {
    name: "",
    location: null,
  },
};
