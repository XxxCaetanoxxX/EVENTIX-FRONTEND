import { create } from "zustand";

interface ImageModalState {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useImageModalStore = create<ImageModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))