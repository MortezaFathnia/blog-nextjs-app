"use client";

import { FilteredUser } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authUser: boolean;
  requestLoading: boolean;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: false,
  requestLoading: false,
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: false, requestLoading: false }),
}));

export default useStore;