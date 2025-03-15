import { useMutation } from "@tanstack/react-query";
import { IAxiosResponse } from './../../types/Response';
import { updateBarberPassword } from "@/services/barber/barberService";

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useBarberPasswordUpdateMutation = () => {
  return useMutation<IAxiosResponse, Error, UpdatePasswordData>({
    mutationFn: updateBarberPassword,
  });
};
