import { UserRole } from "./UserRoles";

export interface IAxiosResponse {
   success: boolean;
   message: string;
}

export interface IAuthResponse extends IAxiosResponse {
   user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: UserRole;
      profileImage: string;
      phoneNumber: string;
   }
}