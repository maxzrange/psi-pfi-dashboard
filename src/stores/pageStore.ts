import { LoadingType, SearchType } from "types/stateType";
import { create } from "zustand";

export const useLoading = create<LoadingType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));

export const useSearch = create<SearchType>((set) => ({
  value: "default",
  changeSearch: (val) => set({ value: val }),
  resetSearch: () => set({ value: "default" }),
}));
