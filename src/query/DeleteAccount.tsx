import { AccountFormData, OtpFormData } from '../entities/Form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

const deleteAccount = async (data: AccountFormData) => {
  const response = await axiosInstance.post('t_helpdesk/otp', data);
  return response.data;
};

export const deleteAccountMutation = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      console.log('Data berhasil dikirim:', data);
    },
    onError: (error) => {
      console.error('Terjadi kesalahan:', error);
    },
  });
};


const verifyOtp = async (data: OtpFormData) => {
  const response = await axiosInstance.post('t_helpdesk/verification', data);
  return response.data;
};

export const verifyOtpMutation = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log('Data berhasil dikirim:', data);
    },
    onError: (error) => {
      console.error('Terjadi kesalahan:', error);
    },
  });
};