import { IUserEntity } from "./user.entity";

export interface IAdminEntity extends IUserEntity {
	adminId: string;
	isSuperAdmin: boolean;
}
