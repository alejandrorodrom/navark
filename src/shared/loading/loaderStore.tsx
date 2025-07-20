import { create } from 'zustand'

type LoaderStore = {
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: true,
  setLoading: (value) => set({ isLoading: value }),
}))
