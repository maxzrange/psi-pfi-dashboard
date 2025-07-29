export interface LoginInput {
  username: string;
  password: string;
}

export interface ForgotInput extends Omit<LoginInput, "username"> {
  confirm_password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  email: string;
  confirm_password: string;
}

export interface RefreshDTO {
  access_token: string;
  token_type: string;
  username: string;
  refresh_token: string;
}

export interface LoginDTO extends RefreshDTO {
  refresh_token: string;
  username: string;
}

export interface TokenDTO {
  exp: number;
  sub: string;
  token_type: string;
}

export interface RegisterDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  tier_id: number | null;
}

export interface LogoutDTO {
  message: string;
}
