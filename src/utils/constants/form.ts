import {
  ForgotInput,
  LoginInput,
  RegisterInput,
} from "@interfaces/authInterface";
import { BuildingTypeInput } from "@interfaces/buildingTypeInterface";
import { DefectInput, DefectPicIput } from "@interfaces/defectInterface";
import { DefectTypeInput } from "@interfaces/defectTypeInterface";
import { BuildingInput } from "src/interfaces/buildingInterface";
import { ProjectInput } from "src/interfaces/projectInterface";
import { AuthFormType, FormType } from "types/formType";

export const loginForm: AuthFormType<LoginInput> = {
  title: "Sign In",
  subTitle: "Please input your registered username and password for signing in",
  inputs: [
    [
      {
        type: "text",
        name: "username",
        label: "Username",
        required: false,
        rules: {
          required: "Username must be filled!",
        },
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        required: false,
        rules: {
          required: "Password must be filled!",
        },
      },
    ],
  ],
  defaultValues: {
    username: "",
    password: "",
  },
  buttonLabel: "Sign In",
};

export const forgotForm: AuthFormType<ForgotInput> = {
  title: "Forgot Password",
  subTitle: "Input new password for your account",
  inputs: [
    [
      {
        type: "password",
        name: "password",
        label: "Password",
        required: true,
        rules: {
          required: "Password must be filled!",
          minLength: {
            value: 8,
            message: "Password at least 8 characters!",
          },
        },
      },
      {
        type: "confirm",
        name: "confirm_password",
        label: "Confirm Password",
        required: true,
        rules: {
          required: "Confirm password must be filled!",
        },
      },
    ],
  ],
  defaultValues: {
    password: "",
    confirm_password: "",
  },
  buttonLabel: "Change Password",
};

export const registerForm: AuthFormType<RegisterInput> = {
  title: "Sign Up",
  subTitle: "Please input your information",
  inputs: [
    [
      {
        type: "text",
        name: "name",
        label: "Full Name",
        required: true,
        rules: {
          required: "Full name must be filled!",
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Full name must consist of alphabets only!",
          },
        },
      },
      {
        type: "text",
        name: "username",
        label: "Username",
        required: true,
        rules: {
          required: "Username must be filled!",
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Username must consist of alphanumeric only!",
          },
        },
      },
      {
        type: "text",
        name: "email",
        label: "Email",
        required: true,
        rules: {
          required: "Email must be filled!",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format!",
          },
        },
      },
    ],
    [
      {
        type: "password",
        name: "password",
        label: "Password",
        required: false,
        rules: {
          required: "Password must be filled!",
          minLength: {
            value: 8,
            message: "Password at least 8 characters!",
          },
        },
      },
      {
        type: "confirm",
        name: "confirm_password",
        label: "Confirm Password",
        required: true,
        rules: {
          required: "Confirm password must be filled!",
        },
      },
    ],
  ],
  defaultValues: {
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  buttonLabel: "Sign Up",
};

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
      type: "text",
      name: "address_detail",
      label: "Address",
      required: false,
    },
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      required: true,
      items: [
        { label: "", id: "" },
        { label: "Pending", id: "1" },
        { label: "Rejected", id: "2" },
        { label: "Accepted", id: "3" },
      ],
      rules: {
        required: "Status must be chosen!",
      },
    },
  ],
  defaultValues: {
    name: "",
    description: "",
    address_detail: "",
    status: "",
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
        required: "Name must be filled!",
      },
    },
    {
      type: "text",
      name: "address",
      label: "Address",
      required: true,
      rules: {
        required: "Address must be filled!",
      },
    },
    {
      type: "number",
      name: "year_built",
      label: "Year Built",
      required: true,
      rules: {
        required: "Year built must be filled!",
      },
    },
    {
      type: "auto",
      name: "building_type",
      label: "Building Type",
      required: true,
      rules: {
        required: "Building type must be filled!",
      },
      items: [{ id: "0", label: "" }],
    },
    {
      type: "number",
      name: "area_sq_meters",
      label: "Area (sq meter)",
      required: true,
      rules: {
        required: "Area must be filled!",
        min: {
          value: 1,
          message: "Area must be filled!",
        },
        pattern: {
          value: /^\d+(\.\d{2})?$/,
          message: "Area must be a number or decimal!",
        },
      },
    },
    {
      type: "number",
      name: "levels_count",
      label: "Number of Levels",
      required: true,
      rules: {
        required: "Number of levels must be filled!",
        min: {
          value: 1,
          message: "Number of levels must be filled!",
        },
      },
    },
    {
      type: "number",
      name: "sides_count",
      label: "Number of Sides",
      required: true,
      rules: {
        required: "Number of elevations must be filled!",
        min: {
          value: 1,
          message: "Number of sides must be filled!",
        },
      },
    },
    {
      type: "text",
      name: "owner",
      label: "Owner",
      required: false,
    },
    {
      type: "auto",
      name: "project_id",
      label: "Project",
      required: true,
      rules: {
        required: "Project must be chosen!",
      },
      items: [{ id: "0", label: "" }],
    },
    {
      type: "map",
      name: "location",
      label: "Location",
      required: true,
      rules: {
        required: "Location must be chosen!",
      },
    },
    {
      type: "number",
      name: "status_construction",
      label: "Construction Status (%)",
      required: true,
      rules: {
        required: "Construction status must be filled!",
      },
    },
    {
      type: "date",
      name: "construction_start_date",
      label: "Construction Start Date",
      required: true,
      rules: {
        required: "Construction start date must be filled!",
      },
    },
    {
      type: "date",
      name: "construction_end_date",
      label: "Construction End Date",
      required: true,
      rules: {
        required: "Construction end date must be filled!",
      },
    },
    {
      type: "tab",
      name: "buildingData",
      label: "Building Data",
      required: true,
      tabData: [
        {
          title: "Elevations",
          name: "sides",
          inputs: [
            {
              type: "text",
              name: "name",
              label: "Name",
              required: true,
              rules: {
                required: "Name must be filled!",
              },
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              required: true,
              rules: {
                required: "Description must be filled!",
              },
            },
            {
              type: "number",
              name: "orientation_degrees",
              label: "Orientation Degrees",
              required: true,
              rules: {
                required: "Orientation degrees must be filled!",
                min: {
                  value: 1,
                  message: "Orientation degrees must be filled!",
                },
                pattern: {
                  value: /^\d+(\.\d{2})?$/,
                  message: "Orientation degrees must be a number or decimal!",
                },
              },
            },
          ],
          defaultValues: {
            name: "",
            description: "",
            orientation_degrees: 0,
          },
        },
        {
          title: "Levels",
          name: "levels",
          inputs: [
            {
              type: "text",
              name: "level_name",
              label: "Name",
              required: true,
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              required: true,
            },
            {
              type: "text",
              name: "primary_usage",
              label: "Usage",
              required: true,
            },
          ],
          defaultValues: {
            level_name: "",
            description: "",
            primary_usage: "",
          },
        },
      ],
      rules: {
        required: "Sides and levels must at least 1!",
      },
    },
  ],
  defaultValues: {
    name: "",
    address: "",
    year_built: "",
    building_type: null,
    area_sq_meters: 0,
    levels_count: 0,
    sides_count: 0,
    owner: "",
    project_id: null,
    location: null,
    status_construction: 0,
    construction_start_date: null,
    construction_end_date: null,
    buildingData: [[], []],
  },
};

export const buildingTypeForm: FormType<BuildingTypeInput> = {
  title: "Add Building Type",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Name",
      required: true,
      rules: {
        required: "Name must be filled!",
      },
    },
    {
      type: "textarea",
      name: "description",
      label: "Decription",
      required: true,
      rules: {
        required: "Description must be filled!",
      },
    },
  ],
  defaultValues: {
    name: "",
    description: "",
  },
};

export const defectForm: FormType<DefectInput> = {
  title: "Add Defect",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Name",
      required: true,
      rules: {
        required: "Name must be filled!",
      },
    },
    {
      type: "auto",
      name: "defect_type_id",
      label: "Defect Type",
      required: true,
      items: [{ id: "0", label: "" }],
      rules: {
        required: "Defect type must be chosen!",
      },
    },
  ],
  defaultValues: {
    name: "",
    defect_type_id: null,
  },
};

export const defectTypeForm: FormType<DefectTypeInput> = {
  title: "Add Defect Type",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Name",
      required: true,
      rules: {
        required: "Name must be filled!",
      },
    },
  ],
  defaultValues: {
    name: "",
  },
};

export const defectPicForm: FormType<DefectPicIput> = {
  title: "Add Defect Picture",
  inputs: [
    {
      type: "auto",
      name: "building_id",
      label: "Building",
      required: true,
      items: [{ id: "0", label: "" }],
    },
    {
      type: "cart",
      name: "reports",
      label: "Report Cart",
      required: true,
      cartData: {
        title: "Report",
        inputs: [
          {
            type: "auto",
            name: "side_id",
            label: "Elevation",
            required: true,
            items: [{ id: "0", label: "" }],
          },
          {
            type: "gallery",
            name: "side_image",
            label: "Elevation Picture",
            required: true,
          },
          {
            type: "cart",
            name: "levels",
            label: "Elevations",
            required: true,
            cartData: {
              title: "Level",
              background: "var(--amplify-colors-background-secondary)",
              inputs: [
                {
                  type: "auto",
                  name: "level_from_id",
                  label: "Level From",
                  required: true,
                  items: [{ id: "0", label: "" }],
                },
                {
                  type: "auto",
                  name: "level_to_id",
                  label: "Label To",
                  required: false,
                  items: [{ id: "0", label: "" }],
                },
                {
                  type: "gallery",
                  name: "images",
                  label: "Pictures",
                  required: true,
                },
              ],
              defaultValues: {
                level_from_id: null,
                level_to_id: null,
                images: [],
              },
            },
          },
        ],
        defaultValues: {
          side_id: null,
          side_image: [],
          levels: [],
        },
      },
    },
  ],
  defaultValues: {
    building_id: null,
    reports: [],
  },
};
