import { UserRole } from "./UserRoles";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	role?: UserRole;
}

export interface ILoginData {
   email: string;
   password: string;
   role: UserRole
}

export interface IAdmin {
   email: string;
   password: string;
   role: "admin"
}

export interface IClient {
   firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
   role: "client"
}

export interface IBarber {
   firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
   role: "barber"
}

export type UserDTO = IAdmin | IClient | IBarber  