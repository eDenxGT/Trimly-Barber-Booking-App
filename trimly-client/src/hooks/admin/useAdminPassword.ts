import { useMutation } from "@tanstack/react-query";
import { IAxiosResponse } from './../../types/Response';
import { updateAdminPassword } from "@/services/admin/adminService";

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useAdminPasswordUpdateMutation = () => {
  return useMutation<IAxiosResponse, Error, UpdatePasswordData>({
    mutationFn: updateAdminPassword,
  });
};
