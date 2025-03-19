import { barberAxiosInstance } from "@/api/barber.axios";
import { IBarberShopFormValues } from "@/hooks/barber/useBarberShopForm";
import { IAxiosResponse } from "@/types/Response";
import { IBarber } from "@/types/User";

export interface UpdatePasswordData {
	oldPassword: string;
	newPassword: string;
}

export type BarberResponse = {
	success: boolean;
	message: string;
	user: IBarber;
};

export type IUpdateBarberData = Pick<
	IBarber,
	"firstName" | "lastName" | "email" | "phoneNumber" | "profileImage"
>;

export const updateBarberPassword = async ({
	oldPassword,
	newPassword,
}: UpdatePasswordData) => {
	const response = await barberAxiosInstance.put<IAxiosResponse>(
		"/barber/update-password",
		{
			oldPassword,
			newPassword,
		}
	);
	return response.data;
};

export const updateBarberProfile = async (
	data: IUpdateBarberData
): Promise<BarberResponse> => {
	const response = await barberAxiosInstance.put<BarberResponse>(
		"/barber/details",
		data
	);
	return response.data;
};

export const registerBarberShop = async (
	data: IBarberShopFormValues
): Promise<IAxiosResponse> => {
	const response = await barberAxiosInstance.post<IAxiosResponse>("/barber/shop", data);

	return response.data;
};
