import { ConfirmationType, DetailType } from "./pageType";

export type LoadingType = {
  show: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export type OneAuthType = {
  token: string;
  setToken: (value: string) => void;
  resetToken: () => void;
};

export type AuthType = Omit<OneAuthType, "setToken"> & {
  username: string;
  setToken: (token: string, username: string) => void;
  checkIsLoggedIn: () => void;
};

export type DetailModalType = {
  show: boolean;
  data: DetailType | null;
  showModal: (data: DetailType) => void;
  hideModal: () => void;
};

export type ConfirmationModalType = {
  show: boolean;
  data: ConfirmationType | null;
  showModal: (data: ConfirmationType) => void;
  hideModal: () => void;
};

export type SearchType = {
  value: string;
  changeSearch: (val: string) => void;
  resetSearch: () => void;
};
