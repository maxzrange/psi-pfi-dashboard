import { LoadingType, OneThemeType, SearchType } from "types/stateType";
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

export const useOneTheme = create<OneThemeType>((set, get) => ({
  data: [
    {
      label: "Areas within 5km of aerodromes",
      value: "boundary_5km",
      active: true,
    },
    {
      label: "Areas within Danger Areas",
      value: "danger_areas",
      active: true,
    },
    {
      label: "Areas within Prohibited Areas",
      value: "prohibited_areas",
      active: true,
    },
    {
      label: "Areas within Restricted Areas",
      value: "restricted_areaspoly",
      active: true,
    },
    {
      label:
        "Prohibited Drone flying areas at NParks Nature Reserves, Nature Parks and Gardens",
      value: "drone_no_fly",
      active: true,
    },
    {
      label: "Protected Area under Section 7 Air Navigation Act",
      value: "mha_uav_2015",
      active: true,
    },
    {
      label: "Areas within a Temporary Restricted Area",
      value: "tra_poly",
      active: true,
    },
  ],
  onClick: (value) => {
    const current = get().data;

    const mapData = current.map((item) => {
      if (item.value === value) {
        Object.assign(item, {
          active: !item.active,
        });
      }

      return item;
    });

    set({ data: mapData });
  },
}));
