import { DetailType } from "./pageType";

export type LoadingType = {
  show: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export type AuthType = {
  token: string;
  setToken: (value: string) => void;
  resetToken: () => void;
};

export type DetailModalType = {
  show: boolean;
  data: DetailType | null;
  showModal: (data: DetailType) => void;
  hideModal: () => void;
};
