import { injectable } from "tsyringe";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";
import { BarberShopModel } from "@/frameworks/database/mongoDB/models/barber-shop.model";
import { IPaginatedShops } from "@/entities/models/paginated/paginated-shops.entity";

@injectable()
export class ShopRepository implements IShopRepository {
	async save(data: Partial<IBarberShopEntity>): Promise<void> {
		await BarberShopModel.create(data);
	}

	async find(
		filter: any,
		skip: number,
		limit: number
	): Promise<IPaginatedShops> {
		const [shops, total] = await Promise.all([
			BarberShopModel.aggregate([
				{ $match: filter },
				{ $sort: { createdAt: -1 } },
				{ $skip: skip },
				{ $limit: limit },
				{
					$lookup: {
						from: "barbers",
						localField: "owner",
						foreignField: "userId",
						as: "ownerInfo",
					},
				},
				{
					$unwind: {
						path: "$ownerInfo",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						id: { $toString: "$_id" },
						shopId: 1,
						name: 1,
						owner: 1,
						ownerName: {
							$concat: [
								"$ownerInfo.firstName",
								" ",
								"$ownerInfo.lastName",
							],
						},
						barbers: 1,
						paymentMode: 1,
						description: 1,
						contactNumber: 1,
						email: 1,
						address: 1,
						commissionPercentage: 1,
						walletBalance: 1,
						barberEarnings: 1,
						status: 1,
						bannerImage: 1,
						logoImage: 1,
						daysOpen: 1,
						openingTime: 1,
						closingTime: 1,
						amenities: 1,
						createdBy: 1,
						approvedBy: 1,
						createdAt: 1,
						updatedAt: 1,
					},
				},
			]),
			BarberShopModel.countDocuments(filter),
		]);

		return {
			shops,
			total,
		};
	}

	async findByIdAndUpdate(
		id: any,
		updateData: Partial<IBarberShopEntity>
	): Promise<IBarberShopEntity | null> {
		const barberShop = await BarberShopModel.findByIdAndUpdate(
			id,
			{ $set: updateData },
			{ new: true }
		).lean();
		if (!barberShop) return null;
		return {
			...barberShop,
			id: barberShop._id.toString(),
		} as IBarberShopEntity;
	}

	async findByBarberId(barberId: string): Promise<IBarberShopEntity | null> {
		const barberShop = await BarberShopModel.findOne({ owner: barberId }).lean()
		if (!barberShop) return null;
		return {
			...barberShop,
			id: barberShop._id.toString(),
		} as IBarberShopEntity;
	}
}
