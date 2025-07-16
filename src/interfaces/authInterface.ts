export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotInput extends Omit<LoginInput, "email"> {
  confirm_password: string;
}
