import { LoadingType } from "types/stateType";
import { create } from "zustand";

export const useLoading = create<LoadingType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));
