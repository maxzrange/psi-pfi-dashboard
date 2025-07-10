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
