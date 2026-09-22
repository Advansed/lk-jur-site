import { create } from 'zustand';

interface ProfileState {
  profile: any;
  setProfile: (profile: any) => void;
  reset: () => void;
}

const initialState = {
  profile: null as any,
};

export const useProfileStore = create<ProfileState>()((set) => ({
  ...initialState,
  setProfile: (profile) => set({ profile }),
  reset: () => set(initialState),
}));
