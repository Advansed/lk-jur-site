import { create } from 'zustand';

export interface AgreementMessage {
  error: boolean;
  message: string;
}

interface AgreementsState {
  dogs: any[];
  messages: AgreementMessage[];
  load: boolean;
  setDogs: (dogs: any[]) => void;
  setMessages: (messages: AgreementMessage[]) => void;
  setLoad: (load: boolean) => void;
  reset: () => void;
}

const initialState = {
  dogs: [] as any[],
  messages: [] as AgreementMessage[],
  load: false,
};

export const useAgreementsStore = create<AgreementsState>()((set) => ({
  ...initialState,
  setDogs: (dogs) => set({ dogs }),
  setMessages: (messages) => set({ messages }),
  setLoad: (load) => set({ load }),
  reset: () => set(initialState),
}));
