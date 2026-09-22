import { create } from 'zustand';

interface AppsState {
  apps: any[];
  setApps: (apps: any[]) => void;
  reset: () => void;
}

const initialState = {
  apps: [] as any[],
};

export const useAppsStore = create<AppsState>()((set) => ({
  ...initialState,
  setApps: (apps) => set({ apps }),
  reset: () => set(initialState),
}));
