import { AuthType } from "types/stateType";
import { create } from "zustand";

export const useOneAuth = create<AuthType>((set) => ({
  token: "",
  setToken: (value) => set({ token: value }),
  resetToken: () => set({ token: "" }),
}));
