import {
  ForgotInput,
  LoginInput,
  RegisterInput,
} from "@interfaces/authInterface";
import { BuildingInput } from "src/interfaces/buildingInterface";
import { ProjectInput } from "src/interfaces/projectInterface";
import { AuthFormType, FormType } from "types/formType";

export const loginForm: AuthFormType<LoginInput> = {
  title: "Sign In",
  subTitle: "Please input your registered email and password for signing in",
  inputs: [
    [
      {
        type: "text",
        name: "email",
        label: "Email",
        required: false,
        rules: {
          required: "Email must be filled!",
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
    email: "",
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
        name: "fullName",
        label: "Full Name",
        required: true,
        rules: {
          required: "Full name must be filled!",
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Full name must consist of alphabets only!",
          },
        },
      },
      {
        type: "phone",
        name: "phone",
        label: "Phone Number",
        required: true,
        rules: {
          required: "Phone number must be filled!",
          pattern: {
            value: /^((\+65)?[89]\d{7}|(\+62|0)8[1-9][0-9]{6,9})$/,
            message: "Invalid phone number format! (SIN | IDN)",
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
    fullName: "",
    phone: "",
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
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      required: true,
      items: [
        { label: "Pending", id: "1" },
        { label: "Rejected", id: "2" },
        { label: "Accepted", id: "3" },
      ],
      rules: {
        required: "Status must be picked!",
      },
    },
  ],
  defaultValues: {
    name: "",
    description: "",
    location: null,
    customer: null,
    status: null,
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
