import { IUserEntity } from "./user.entity";

export interface IClientEntity extends IUserEntity {
	googleId?: string;
	location: {
		name: string;
		latitude: number;
		longitude: number;
	};
}
