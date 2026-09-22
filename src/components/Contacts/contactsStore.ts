import { create } from 'zustand';

interface ContactsState {
  contacts: any;
  setContacts: (contacts: any) => void;
  reset: () => void;
}

const initialState = {
  contacts: null as any,
};

export const useContactsStore = create<ContactsState>()((set) => ({
  ...initialState,
  setContacts: (contacts) => set({ contacts }),
  reset: () => set(initialState),
}));
