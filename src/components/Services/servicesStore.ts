import { create } from 'zustand';

interface ServicesState {
  services: any;
  setServices: (services: any) => void;
  reset: () => void;
}

const initialState = {
  services: [] as any[],
};

export const useServicesStore = create<ServicesState>()((set) => ({
  ...initialState,
  setServices: (services) => set({ services: Array.isArray(services) ? services : [] }),
  reset: () => set(initialState),
}));
