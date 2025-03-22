import { IClientEntity } from "../client.entity";
import { IBarberEntity } from "../barber.entity";

export interface IPaginatedUsers {
	user: IClientEntity[] | IBarberEntity[] | [];
	total: number;
}
