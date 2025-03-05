import { signin } from "@/services/auth/authService"
import { IAxiosResponse } from "@/types/Response"
import { ILoginData } from "@/types/User"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
   return useMutation<IAxiosResponse, Error, ILoginData>({
      mutationFn: signin
   })
}