"use client"

import { Post } from "@/types/Post"
import { create } from "zustand"

type Store = {
  authUser: boolean
  requestLoading: boolean
  token:string
  setToken:(token: string) => void
  setRequestLoading: (isLoading: boolean) => void
  reset: () => void
}

const useStore = create<Store>((set) => ({
  authUser: false,
  requestLoading: false,
  token:'',
  setToken:(token)=>set((state)=>({...state,token})),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: false, requestLoading: false }),
}))

export default useStore