// import { userAxiosInstance } from "@/api/user.axios";
import { authAxiosInstance } from "@/api/auth.axios";
import { ILoginData, UserDTO } from "@/types/User";
import { IAuthResponse, IAxiosResponse } from "@/types/Response";
import { clientAxiosInstance } from "@/api/client.axios";

export const signup = async (user: UserDTO): Promise<IAxiosResponse> => {
	const response = await authAxiosInstance.post<IAxiosResponse>(
		"/signup",
		user
	);
	return response.data;
};

export const signin = async (user: ILoginData): Promise<IAuthResponse> => {
	const response = await authAxiosInstance.post<IAuthResponse>(
		"/signin",
		user
	);
	console.log(response);
	return response.data;
};

export const sendOtp = async (email: string): Promise<IAxiosResponse> => {
	const response = await authAxiosInstance.post<IAxiosResponse>("/send-otp", {
		email,
	});
	return response.data;
};

export const verifyOtp = async (data: {
	email: string;
	otp: string;
}): Promise<IAxiosResponse> => {
	const response = await authAxiosInstance.post<IAxiosResponse>(
		"/verify-otp",
		data
	);
	return response.data;
};

export const logoutClient = async (): Promise<IAxiosResponse> => {
	const response = await clientAxiosInstance.post("/client/logout");
	return response.data;
};
