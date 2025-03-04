import { TRole } from "../../shared/constants";

export interface IUserEntity {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: TRole;
  profileImage?: string;
  phoneNumber?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}
