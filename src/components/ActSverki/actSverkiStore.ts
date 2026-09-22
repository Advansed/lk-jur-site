import { create } from 'zustand';

interface ActSverkiState {
  invoices: any[];
  docs: any[];
  actsverki: string;
  setInvoices: (invoices: any[]) => void;
  setDocs: (docs: any[]) => void;
  setActsverki: (actsverki: string) => void;
  reset: () => void;
}

const initialState = {
  invoices: [] as any[],
  docs: [] as any[],
  actsverki: '',
};

export const useActSverkiStore = create<ActSverkiState>()((set) => ({
  ...initialState,
  setInvoices: (invoices) => set({ invoices }),
  setDocs: (docs) => set({ docs }),
  setActsverki: (actsverki) => set({ actsverki }),
  reset: () => set(initialState),
}));
