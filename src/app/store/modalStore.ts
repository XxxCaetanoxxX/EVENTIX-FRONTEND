import {create} from "zustand";

interface ModalData {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useModalStore = create<ModalData>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))