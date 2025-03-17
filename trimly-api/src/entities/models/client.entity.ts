import { IUserEntity } from "./user.entity";

export interface IClientEntity extends IUserEntity {
	location: {
		name: string;
		latitude: number;
		longitude: number;
	};
}
