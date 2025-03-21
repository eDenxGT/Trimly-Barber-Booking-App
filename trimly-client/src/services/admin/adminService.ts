import { adminAxiosInstance } from "@/api/admin.axios";
import { FetchUsersParams, UsersResponse } from "@/hooks/admin/useAllUsers";
import { IAxiosResponse } from "@/types/Response";
import { IClient, IBarber, IAdmin } from "@/types/User";

export interface UpdatePasswordData {
	oldPassword: string;
	newPassword: string;
}

export type AdminResponse = {
	success: boolean;
	message: string;
	user: IAdmin;
};

export type IUpdateAdminData = Pick<
	IAdmin,
	"firstName" | "lastName" | "email" | "phoneNumber" | "profileImage"
>;

export const getAllUsers = async <T extends IClient | IBarber>({
	userType,
	page = 1,
	limit = 10,
	search = "",
}: FetchUsersParams): Promise<UsersResponse<T>> => {
	const response = await adminAxiosInstance.get("/admin/users", {
		params: { userType, page, limit, search },
	});

	return {
		users: response.data.users,
		totalPages: response.data.totalPages,
		currentPage: response.data.currentPage,
	};
};

export const updateUserStatus = async (data: {
	userType: string;
	userId: string;
}): Promise<IAxiosResponse> => {
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
}: UpdatePasswordData): Promise<IAxiosResponse> => {
	const response = await adminAxiosInstance.put<IAxiosResponse>(
		"/admin/update-password",
		{
			oldPassword,
			newPassword,
		}
	);
	return response.data;
};

export const updateAdminProfile = async (
	data: IUpdateAdminData
): Promise<AdminResponse> => {
	const response = await adminAxiosInstance.put<AdminResponse>(
		"/admin/details",
		data
	);
	return response.data;
};
