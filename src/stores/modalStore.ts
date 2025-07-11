import { DetailModalType } from "types/stateType";
import { create } from "zustand";

export const useDetailModal = create<DetailModalType>((set) => ({
  show: false,
  data: null,
  showModal: (data) => set({ show: true, data }),
  hideModal: () => set({ show: false, data: null }),
}));
