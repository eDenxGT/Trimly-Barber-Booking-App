import { useMutation } from "@tanstack/react-query";
import { IAxiosResponse } from '../../types/Response';
import { updateClientPassword } from "@/services/client/clientService";

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useClientPasswordUpdateMutation = () => {
  return useMutation<IAxiosResponse, Error, UpdatePasswordData>({
    mutationFn: updateClientPassword,
  });
};
