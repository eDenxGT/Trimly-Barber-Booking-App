import { IBarberEntity } from "../../models/barber.entity";

export interface IBarberRepository {
	save(data: Partial<IBarberEntity>): Promise<IBarberEntity>;
	findByEmail(email: string): Promise<IBarberEntity | null>;
	findById(id: any): Promise<IBarberEntity | null>;
}
