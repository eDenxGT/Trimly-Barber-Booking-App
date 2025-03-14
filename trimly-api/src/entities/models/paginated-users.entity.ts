import { IClientEntity } from "./client.entity";
import { IBarberEntity } from "./barber.entity";

export interface PaginatedUsers {
	user: IClientEntity[] | IBarberEntity[] | [];
	total: number;
}
