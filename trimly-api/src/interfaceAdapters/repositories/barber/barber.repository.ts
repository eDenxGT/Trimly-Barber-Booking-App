import { injectable } from "tsyringe";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { BarberModel } from "@/frameworks/database/mongoDB/models/barber.model";

@injectable()
export class BarberRepository implements IBarberRepository {
	async save(data: Partial<IBarberEntity>): Promise<IBarberEntity> {
		return await BarberModel.create(data);
	}
	async findByEmail(email: string): Promise<IBarberEntity | null> {
		const barber = await BarberModel.findOne({ email }).lean();
		if (!barber) return null;

		return {
			...barber,
			id: barber._id.toString(),
		} as IBarberEntity;
	}
	async findById(id: any): Promise<IBarberEntity | null> {
		const barber = await BarberModel.findById(id).lean();
		if (!barber) return null;

		return {
			...barber,
			id: barber._id.toString(),
		} as IBarberEntity;
	}

	async find(
		filter: any,
		skip: number,
		limit: number
	): Promise<{ user: IBarberEntity[] | []; total: number }> {
		const [user, total] = await Promise.all([
			BarberModel.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit),
			BarberModel.countDocuments(filter),
		]);

		return {
			user,
			total,
		};
	}

	async updateByEmail(
		email: string,
		updates: Partial<IBarberEntity>
	): Promise<IBarberEntity | null> {
		const barber = await BarberModel.findOneAndUpdate(
			{ email },
			{ $set: updates },
			{ new: true }
		).lean();
		if (!barber) return null;

		return {
			...barber,
			id: barber._id.toString(),
		} as IBarberEntity;
	}

	async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
		await BarberModel.findByIdAndUpdate(id, {
			$set: {
				status: status,
			},
		});
	}
}
