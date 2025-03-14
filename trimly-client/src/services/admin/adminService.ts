import { adminAxiosInstance } from "@/api/admin.axios";

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
