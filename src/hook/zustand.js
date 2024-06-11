import { create } from "zustand";
export const ModeStand = create((set) => ({
  theme: "light",
  changeTheme: (value) => set({ theme: value }),
}));
