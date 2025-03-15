import { barberAxiosInstance } from "@/api/barber.axios";
import { IAxiosResponse } from "@/types/Response";

export interface UpdatePasswordData {
	oldPassword: string;
	newPassword: string;
}

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
