import { registerBarberShop } from "@/services/barber/barberService";
import { IAxiosResponse } from "@/types/Response";
import { useMutation } from "@tanstack/react-query";
import { IBarberShopData } from "./useBarberShopForm";

export const useCreateBarberShop = () => {
	return useMutation<IAxiosResponse, Error, IBarberShopData>({
		mutationFn: registerBarberShop,
	});
};
