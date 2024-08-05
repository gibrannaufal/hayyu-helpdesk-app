import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AccountFormData } from "../entities/Form";

interface ResendOtp {
    FormResendOtp: AccountFormData;
    setResendOtp: (data: Partial<AccountFormData>) => void;
}

const initialFormData: AccountFormData = {
  telp: '',
  password: ''
};

export const useResendOtp = create<ResendOtp>((set) => ({
    FormResendOtp: initialFormData,
    setResendOtp: (data) => set((state) => ({FormResendOtp: { ...state.FormResendOtp, ...data } })),
}));