import { clientAxiosInstance } from "@/api/client.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { IAxiosResponse } from "@/types/Response";
import { IClient } from "@/types/User";

export type ClientResponse = {
	success: boolean;
	message: string;
	user: IClient;
};

export type IUpdateClientData = Pick<
	IClient,
	| "firstName"
	| "lastName"
	| "email"
	| "phoneNumber"
	| "profileImage"
	| "location"
>;

export const updateClientPassword = async ({
	oldPassword,
	newPassword,
}: UpdatePasswordData): Promise<IAxiosResponse> => {
	const response = await clientAxiosInstance.put<IAxiosResponse>(
		"/client/update-password",
		{
			oldPassword,
			newPassword,
		}
	);
	return response.data;
};

export const updateClientProfile = async (
	data: IUpdateClientData
): Promise<ClientResponse> => {
	const response = await clientAxiosInstance.put<ClientResponse>(
		"/client/details",
		data
	);
	return response.data;
};
