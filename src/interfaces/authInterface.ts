export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotInput extends Omit<LoginInput, "email"> {
  confirm_password: string;
}

export interface RegisterInput extends LoginInput {
  fullName: string;
  phone: string;
  confirm_password: string;
}
