import { TRole } from "../constants";

export interface AdminDTO {
	userId?: string;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	isSuperAdmin?: boolean;
	role: "admin";
}

export interface ClientDTO {
	userId?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	password?: string;
	profileImage?: string;
	googleId?: string;
	role: "client";
}

export interface BarberDTO {
	googleId?: string;
	userId?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	profileImage?: string;
	password?: string;
	shopId?: string;
	isOwner?: boolean;
	role: "barber";
}

export type UserDTO = AdminDTO | ClientDTO | BarberDTO;

export interface LoginUserDTO {
	email: string;
	password?: string;
	role: TRole;
}
