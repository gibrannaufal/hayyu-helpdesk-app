import { HelpFormData } from '../entities/Form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

const kirimBantuan = async (data: HelpFormData) => {
  const response = await axiosInstance.post('t_helpdesk/', data);
  return response.data;
};

export const useHelpMutation = () => {
  return useMutation({
    mutationFn: kirimBantuan,
    onSuccess: (data) => {
      console.log('Data berhasil dikirim:', data);
    },
    onError: (error) => {
      console.error('Terjadi kesalahan:', error);
    },
  });
};