import { injectable } from "tsyringe";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { barberModel } from "@/frameworks/database/mongoDB/models/barber.model";

@injectable()
export class BarberRepository implements IBarberRepository {
	async save(data: Partial<IBarberEntity>): Promise<IBarberEntity> {
		return await barberModel.create(data);
	}
	async findByEmail(email: string): Promise<IBarberEntity | null> {
		const barber = await barberModel.findOne({ email }).lean();
		if (!barber) return null;

		return {
			...barber,
			id: barber._id.toString(),
		} as IBarberEntity;
	}
}
