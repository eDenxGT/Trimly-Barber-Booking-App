import { UserRole } from "./UserRoles";

export interface User {
	id?: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	profileImage?: string;
	phoneNumber: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ILoginData {
	email: string;
	password: string;
	role: UserRole;
}

export interface IAdmin extends User {
	isSuperAdmin?: boolean;
}

export interface IClient extends User {
	location?: {
		name?: string;
		latitude?: number | null;
		longitude?: number | null;
		detail?: Record<string, string>;
	};
}

export interface IBarber extends User {
	shopId?: string;
	isOwner?: boolean;
}

export type UserDTO = IAdmin | IClient | IBarber;
