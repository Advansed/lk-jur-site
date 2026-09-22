import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoginData {
  id: string;
  token: string;
  phone?: string;
}

export interface RegistrationInfo {
  Контрагент: any;
  ИНН: string;
  Наименование: string;
  КонтактныйТелефон: string;
  элПочта: string;
  Фамилия: string;
  Имя: string;
  Отчество: string;
  Файлы: {
    Устав: any[];
    Карточка: any[];
  };
  Согласие: boolean;
}

interface LoginState {
  auth:     boolean;
  reg:      boolean;
  login:    LoginData | null;
  token:    string | null;
  setAuth:  (auth: boolean) => void;
  setReg:   (reg: boolean) => void;
  setLogin: (login: any) => void;
  setToken: (token: string | null) => void;
  reset:    (initialState?: LoginState) => void;
  logout:   () => void;
}

const initialState = {
  auth:     false,
  reg:      false,
  login:    null,
  token:    null,
};

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (auth: boolean) => set({ auth }),
      setReg: (reg: boolean) => set({ reg }),
      setLogin: (login: any) => set({ login }),
      setToken: (token: string | null) => set({ token }),
      reset: () => set(initialState),
      logout: () => {
        localStorage.removeItem("stngjur.phone");
        localStorage.removeItem("stngjur.pass");
        set(initialState);
      },
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({
        auth: state.auth,
        login: state.login,
        token: state.token,
      }),
    }
  )
);
