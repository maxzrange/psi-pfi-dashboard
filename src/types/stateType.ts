import { ConfirmationType, DetailType, DocumentType } from "./pageType";

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
  userId: number | null;
  setToken: (token: string, username: string) => void;
  setUserId: (id: number) => void;
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

export type OneThemeDataType = {
  label: string;
  value: string;
  active: boolean;
};

export type OneThemeType = {
  data: OneThemeDataType[];
  onClick: (value: string) => void;
};

export type DocumentModalType = {
  show: boolean;
  type: "defect" | "building" | null;
  data: DocumentType[] | null;
  showModal: (data: DocumentType[], type: "defect" | "building" | null) => void;
  hideModal: () => void;
};
