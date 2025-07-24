import {
  ConfirmationModalType,
  DetailModalType,
  LoadingType,
} from "types/stateType";
import { create } from "zustand";

export const useDetailModal = create<DetailModalType>((set) => ({
  show: false,
  data: null,
  showModal: (data) => set({ show: true, data }),
  hideModal: () => set({ show: false, data: null }),
}));

export const useConfirmationModal = create<ConfirmationModalType>((set) => ({
  show: false,
  data: null,
  showModal: (data) => set({ show: true, data }),
  hideModal: () => set({ show: false, data: null }),
}));

export const useLoadingModal = create<LoadingType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));
