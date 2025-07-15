import { generateDecryption } from "@utils/helpers/generator";
import { AuthType } from "types/stateType";
import { create } from "zustand";

export const useOneAuth = create<AuthType>((set) => ({
  token: "",
  setToken: (value) => set({ token: value }),
  resetToken: () => set({ token: "" }),
}));

export const useAuth = create<AuthType & { checkIsLoggedIn: () => void }>(
  (set) => ({
    token: "",
    setToken: (token: string) => set({ token }),
    resetToken: () => set({ token: "" }),
    checkIsLoggedIn: () => {
      const token = localStorage.getItem("@token");

      if (token) {
        const tokenString = generateDecryption(token);

        set({ token: tokenString });
      }
    },
  })
);
