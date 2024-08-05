import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AccountFormData } from "../entities/Form";

interface AccountStore {
 FormData: AccountFormData;
  setFormData: (data: Partial<AccountFormData>) => void;
  resetFormData: () => void;
}

const initialFormData: AccountFormData = {
  telp: '',
  password: ''
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
     FormData: initialFormData,
      setFormData: (data) => set((state) => ({FormData: { ...state.FormData, ...data } })),
      resetFormData: () => set({FormData: initialFormData }),
    }),
    {
      name: 'account-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);