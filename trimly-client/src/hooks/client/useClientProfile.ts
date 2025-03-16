import { IUpdateClientData, updateClientProfile } from "@/services/client/clientService";
import { IAuthResponse, IAxiosResponse } from "@/types/Response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClientProfileMutation = () => {
   const queryClient = useQueryClient();
   return useMutation<IAuthResponse, Error, IUpdateClientData>({
     mutationFn: updateClientProfile,
     onSuccess: () =>
       queryClient.invalidateQueries({ queryKey: ["client-profile"] }),
   });
 };
 