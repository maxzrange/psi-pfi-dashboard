import { TokenDTO } from "@interfaces/authInterface";
import { generateDecryption } from "@utils/helpers/generator";
import { jwtDecode } from "jwt-decode";
import { AuthType, OneAuthType } from "types/stateType";
import { create } from "zustand";

export const useOneAuth = create<OneAuthType>((set) => ({
  token: "",
  setToken: (value) => set({ token: value }),
  resetToken: () => set({ token: "" }),
}));

export const useAuth = create<AuthType>((set) => ({
  token: "",
  username: "",
  userId: null,
  setToken: (token, username) => set({ token, username }),
  setUserId: (id: number) => set({ userId: id }),
  resetToken: () => set({ token: "", username: "" }),
  checkIsLoggedIn: () => {
    const token = localStorage.getItem("@token");

    if (token) {
      const tokenString = generateDecryption(token);
      if (tokenString !== "error") {
        const decoded: TokenDTO = jwtDecode(tokenString);
        set({ token: tokenString, username: decoded.sub });
      } else {
        localStorage.removeItem("@token");
      }
    }
  },
}));
