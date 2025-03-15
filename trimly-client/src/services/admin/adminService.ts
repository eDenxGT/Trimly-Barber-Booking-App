import { adminAxiosInstance } from "@/api/admin.axios";
import { IAxiosResponse } from "@/types/Response";

export interface UpdatePasswordData {
	oldPassword: string;
	newPassword: string;
}
export const getAllUsers = async ({
	userType,
	page = 1,
	limit = 10,
	search = "",
}: {
	userType: string;
	page: number;
	limit: number;
	search: string;
}) => {
	const response = await adminAxiosInstance.get("/admin/users", {
		params: {
			userType,
			page,
			limit,
			search,
		},
	});
	return response.data;
};

export const updateUserStatus = async (data: {
	userType: string;
	userId: any;
}) => {
	const response = await adminAxiosInstance.patch(
		"/admin/user-status",
		{},
		{
			params: {
				userType: data.userType,
				userId: data.userId,
			},
		}
	);
	return response.data;
};

export const updateAdminPassword = async ({
	oldPassword,
	newPassword,
}: UpdatePasswordData) => {
	const response = await adminAxiosInstance.put<IAxiosResponse>(
		"/admin/update-password",
		{
			oldPassword,
			newPassword,
		}
	);
	return response.data;
};
