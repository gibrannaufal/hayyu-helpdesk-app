import { create } from 'zustand';
import { OtpFormData } from "../entities/Form";

interface AccountVerifyState {
  otpValues: string[];
  FormData: OtpFormData;
  setOtpValues: (index: number, value: string) => void;
  setFormData: (data: Partial<OtpFormData>) => void;
}

const useAccountVerifyStore = create<AccountVerifyState>((set) => ({
  otpValues: ['', '', '', '', '', ''],
  FormData: {
    kode_otp: '',
    telp: ''
  },
  setOtpValues: (index, value) => set((state) => {
    const newOtpValues = [...state.otpValues];
    newOtpValues[index] = value;
    const combinedOtp = newOtpValues.join('');
    return {
      otpValues: newOtpValues,
      FormData: { ...state.FormData, kode_otp: combinedOtp }
    };
  }),
  setFormData: (data) => set((state) => ({
    FormData: { ...state.FormData, ...data }
  })),
}));

export default useAccountVerifyStore;