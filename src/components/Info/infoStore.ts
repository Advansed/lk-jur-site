import { create } from 'zustand';

interface InfoState {
  page: number;
  template1: string | null;
  setPage: (page: number) => void;
  setTemplate1: (template1: string | null) => void;
  reset: () => void;
}

const initialState = {
  page: 0,
  template1: null as string | null,
};

export const useInfoStore = create<InfoState>()((set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  setTemplate1: (template1) => set({ template1 }),
  reset: () => set(initialState),
}));
