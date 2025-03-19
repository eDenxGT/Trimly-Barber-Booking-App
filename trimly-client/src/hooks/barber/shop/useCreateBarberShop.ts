import { registerBarberShop } from "@/services/barber/barberService";
import { IAxiosResponse } from "@/types/Response";
import { useMutation } from "@tanstack/react-query";
import { IBarberShopFormValues } from "./useBarberShopForm";

export const useCreateBarberShop = () => {
	return useMutation<IAxiosResponse, Error, IBarberShopFormValues>({
		mutationFn: registerBarberShop,
	});
};
