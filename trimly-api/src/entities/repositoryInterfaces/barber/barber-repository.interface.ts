import { IBarberEntity } from "../../models/barber.entity";

export interface IBarberRepository {
	save(data: Partial<IBarberEntity>): Promise<IBarberEntity | null>;
	findByEmail(email: string): Promise<IBarberEntity | null>;
	find(
		filter: any,
		skip: number,
		limit: number
	): Promise<{ user: IBarberEntity[] | []; total: number }>;
	findById(id: any): Promise<IBarberEntity | null>;
	findByUserId(userId: string): Promise<IBarberEntity | null>;

	updateByEmail(
		email: string,
		updates: Partial<IBarberEntity>
	): Promise<IBarberEntity | null>;
	findByIdAndUpdate(
		id: any,
		updateData: Partial<IBarberEntity>
	): Promise<IBarberEntity | null>;
}
