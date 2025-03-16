import { clientAxiosInstance } from "@/api/client.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { IAxiosResponse } from "@/types/Response";

export type Client = {
	_id?: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	phoneNumber: string;
	profileImage?: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

export type ClientResponse = {
	success: boolean;
	message: string;
	client: Client;
};

export type IUpdateClientData = Pick<
	Client,
	"firstName" | "lastName" | "email" | "phoneNumber" | "profileImage"
>;

export const updateClientPassword = async ({
	oldPassword,
	newPassword,
}: UpdatePasswordData) => {
	const response = await clientAxiosInstance.put<IAxiosResponse>(
		"/client/update-password",
		{
			oldPassword,
			newPassword,
		}
	);
	return response.data;
};


export const updateClientProfile = async (data: IUpdateClientData) => {
	const response = await clientAxiosInstance.put<ClientResponse>(
		"/client/details",
		data
	);
	return response.data;
};