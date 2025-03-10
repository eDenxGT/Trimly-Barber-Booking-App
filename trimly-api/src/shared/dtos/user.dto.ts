import { TRole } from "../constants";

export interface AdminDTO {
  adminId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
  role: "admin";
}

export interface ClientDTO {
  clientId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
}

export interface BarberDTO {
  barberId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  shopId?: string;
  isOwner?: boolean;
  role: "barber";
}

export type UserDTO = AdminDTO | ClientDTO | BarberDTO;

export interface LoginUserDTO {
  email: string;
  password: string;
  role: TRole;
}
