import { IUserEntity } from "./user.entity";

export interface IClientEntity extends IUserEntity {
	userId: string;
	location: {
		name: string;
		latitude: number;
		longitude: number;
		detail: Record<string, string>;
	};
}
