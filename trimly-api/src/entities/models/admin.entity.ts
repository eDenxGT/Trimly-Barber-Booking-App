import { IUserEntity } from "./user.entity";

export interface IAdminEntity extends IUserEntity {
	userId: string;
	isSuperAdmin: boolean;
}
